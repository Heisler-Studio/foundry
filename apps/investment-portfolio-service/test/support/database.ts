import pg from 'pg';
import { createDb, type DbHandle } from '../../src/db/client.ts';

// Tests drop tables and the migration journal, so they get their own database rather than the
// one `pnpm dev` is pointed at. Same server, same DATABASE_URL, `_test` appended to the name.
export const testDatabaseUrl = (baseUrl: string): string => {
  const url = new URL(baseUrl);
  url.pathname = `/${url.pathname.replace(/^\//, '')}_test`;
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
