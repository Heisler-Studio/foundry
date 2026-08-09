import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema/index.ts';

export type Db = ReturnType<typeof createDb>['db'];

export type DbHandle = {
  db: Db;
  close: () => Promise<void>;
};

export const createDb = (databaseUrl: string) => {
  const pool = new pg.Pool({ connectionString: databaseUrl });

  // Postgres dropping an idle client — a restart, a `docker compose stop` — reaches us as an
  // 'error' event, and an unhandled one takes the process down with it. Survive it and let
  // /health report the state instead.
  pool.on('error', (error) => console.error('postgres pool error', error.message));

  // Must stay in step with `casing` in drizzle.config.ts, or generated DDL and runtime queries
  // will name columns differently.
  const db = drizzle({ client: pool, schema, casing: 'snake_case' });

  return { db, close: () => pool.end() };
};
