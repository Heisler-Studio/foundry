import { sql } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { DbHandle } from '../src/db/client.ts';
import { checkHealth } from '../src/health.ts';
import { createTestDb } from './support/database.ts';

const databaseUrl = process.env.DATABASE_URL;

describe.skipIf(!databaseUrl)('health', () => {
  let handle: DbHandle;

  beforeAll(async () => {
    handle = await createTestDb(databaseUrl as string);
  });

  afterAll(async () => {
    await handle?.close();
  });

  it('reports the database up', async () => {
    await expect(checkHealth(handle.db)).resolves.toMatchObject({ status: 'ok', database: 'up' });
  });

  it('survives Postgres dropping its connections', async () => {
    await checkHealth(handle.db);

    const killer = await createTestDb(databaseUrl as string);
    await killer.db.execute(
      sql`select pg_terminate_backend(pid) from pg_stat_activity
          where datname = current_database() and pid <> pg_backend_pid()`,
    );
    await killer.close();

    // The pool's 'error' event fires asynchronously; an unhandled one would take the process
    // down before this resolves.
    await new Promise((resolve) => setTimeout(resolve, 250));

    await expect(checkHealth(handle.db)).resolves.toMatchObject({ status: 'ok', database: 'up' });
  });
});
