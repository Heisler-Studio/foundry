import { createDb } from './client.ts';
import { runMigrations } from './migrate.ts';
import { loadEnv } from '../env.ts';

const { db, close } = createDb(loadEnv().databaseUrl);

try {
  await runMigrations(db);
  console.log('migrations applied');
} finally {
  await close();
}
