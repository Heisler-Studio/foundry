import { existsSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

// The other entry points get .env from `node --env-file-if-exists`; vitest has no equivalent, so
// without this the integration tests see no DATABASE_URL and silently skip.
if (existsSync('.env')) process.loadEnvFile('.env');

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Integration tests share one Postgres; running files in parallel would have them racing over
    // the same schema.
    fileParallelism: false,
    testTimeout: 30_000,
  },
});
