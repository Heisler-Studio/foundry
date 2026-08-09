import { execFile } from 'node:child_process';
import { readdir, readFile, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { eq, sql } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { DbHandle } from '../src/db/client.ts';
import { runMigrations } from '../src/db/migrate.ts';
import { moneyProbe } from './fixtures/schema.ts';
import { createTestDb } from './support/database.ts';

const run = promisify(execFile);
const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const migrationsFolder = join(packageRoot, 'test/fixtures/.migrations');

const databaseUrl = process.env.DATABASE_URL;

describe.skipIf(!databaseUrl)('migration pipeline against Postgres 17', () => {
  let handle: DbHandle;
  let generatedSql: string;

  beforeAll(async () => {
    await rm(migrationsFolder, { recursive: true, force: true });
    await run(
      'pnpm',
      ['exec', 'drizzle-kit', 'generate', '--config', 'test/fixtures/drizzle.config.ts'],
      {
        cwd: packageRoot,
      },
    );

    const files = (await readdir(migrationsFolder)).filter((name) => name.endsWith('.sql')).sort();
    generatedSql = (
      await Promise.all(files.map((name) => readFile(join(migrationsFolder, name), 'utf8')))
    ).join('\n');

    handle = await createTestDb(databaseUrl as string);
    await handle.db.execute(sql`drop table if exists money_probe`);
    await handle.db.execute(sql`drop schema if exists drizzle cascade`);
  });

  afterAll(async () => {
    if (!handle) return;
    await handle.db.execute(sql`drop table if exists money_probe`);
    await handle.db.execute(sql`drop schema if exists drizzle cascade`);
    await handle.close();
    await rm(migrationsFolder, { recursive: true, force: true });
  });

  it('generates exact numeric DDL and no floating-point columns', () => {
    expect(generatedSql).toContain('numeric(19, 4)');
    expect(generatedSql).toContain('numeric(24, 8)');
    expect(generatedSql).toContain('numeric(12, 8)');
    expect(generatedSql).toContain('timestamp with time zone');
    expect(generatedSql).not.toMatch(/\b(real|double precision)\b/i);
  });

  it('maps camelCase fields to snake_case columns', () => {
    expect(generatedSql).toContain('"market_value"');
    expect(generatedSql).toContain('"last_synced_at"');
  });

  it('applies migrations and stays idempotent on a second run', async () => {
    await runMigrations(handle.db, migrationsFolder);
    await runMigrations(handle.db, migrationsFolder);

    const applied = await handle.db.execute<{ count: string }>(
      sql`select count(*)::text as count from drizzle.__drizzle_migrations`,
    );
    expect(applied.rows[0]?.count).toBe('1');
  });

  it('round-trips a value a double would corrupt', async () => {
    // 17 significant digits: Number() rounds this to 1234567890123.4568.
    const exact = '1234567890123.4567';

    await handle.db.insert(moneyProbe).values({
      id: 'probe',
      marketValue: exact,
      shares: '3.14159265',
      distributionYield: '0.05500000',
      lastSyncedAt: new Date('2026-08-09T12:00:00Z'),
    });

    const [row] = await handle.db.select().from(moneyProbe).where(eq(moneyProbe.id, 'probe'));

    expect(row?.marketValue).toBe(exact);
    expect(Number(exact).toString()).not.toBe(exact);
  });
});
