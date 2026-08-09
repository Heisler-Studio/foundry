import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Db } from './client.ts';

// Resolved from this module rather than cwd so it lands on the package root from both `src/db`
// and the emitted `dist/db`.
export const migrationsFolder = resolve(dirname(fileURLToPath(import.meta.url)), '../../drizzle');

export const runMigrations = async (db: Db, folder = migrationsFolder): Promise<void> => {
  await migrate(db, { migrationsFolder: folder });
};
