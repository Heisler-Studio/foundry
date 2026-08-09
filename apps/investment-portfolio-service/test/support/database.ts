import { execFileSync } from 'node:child_process';
import { basename } from 'node:path';
import pg from 'pg';
import { createDb, type DbHandle } from '../../src/db/client.ts';

// Every worktree copies the same .env, so without this they share one test database and drop
// each other's tables mid-run.
const worktreeSuffix = (): string => {
  try {
    const root = execFileSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const slug = basename(root)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
    return slug ? `_${slug}` : '';
  } catch {
    return '';
  }
};

// Tests drop tables and the migration journal, so they get their own database rather than the
// one `pnpm dev` is pointed at. Same server, same DATABASE_URL, `_test<worktree>` appended.
export const testDatabaseUrl = (baseUrl: string): string => {
  const url = new URL(baseUrl);
  url.pathname = `/${url.pathname.replace(/^\//, '')}_test${worktreeSuffix()}`;
  return url.toString();
};

export const createTestDb = async (baseUrl: string): Promise<DbHandle> => {
  const url = testDatabaseUrl(baseUrl);
  const name = new URL(url).pathname.slice(1);

  const admin = new pg.Client({ connectionString: baseUrl });
  await admin.connect();
  try {
    const { rowCount } = await admin.query('select 1 from pg_database where datname = $1', [name]);
    if (!rowCount) await admin.query(`create database "${name.replaceAll('"', '""')}"`);
  } finally {
    await admin.end();
  }

  return createDb(url);
};
