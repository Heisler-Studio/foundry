import { createDb } from './db/client.ts';
import { runMigrations } from './db/migrate.ts';
import { loadEnv } from './env.ts';
import { createHttpServer } from './server.ts';

const env = loadEnv();
const { db, close } = createDb(env.databaseUrl);

await runMigrations(db);

const server = createHttpServer(db);
server.listen(env.port, () => console.log(`investment-portfolio-service listening on :${env.port}`));

const shutdown = () => {
  server.close(() => {
    close().catch((error: unknown) => console.error('failed to close the pool', error));
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
