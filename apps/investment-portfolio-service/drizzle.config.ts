import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  // Mirrored in src/db/client.ts; generated DDL and runtime queries must agree.
  casing: 'snake_case',
  // Only `generate` reads this config; migrations are applied by src/db/migrate.ts, so an unset
  // URL is not an error here.
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
  strict: true,
  verbose: true,
});
