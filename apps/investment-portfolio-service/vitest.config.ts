import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Integration tests share one Postgres; running files in parallel would have them racing over
    // the same schema.
    fileParallelism: false,
    testTimeout: 30_000,
  },
});
