import { getTableConfig, pgTable } from 'drizzle-orm/pg-core';
import { describe, expect, it } from 'vitest';
import { money, quantity, rate, timestamptz } from '../src/db/columns.ts';

const probe = pgTable('probe', {
  marketValue: money(),
  shares: quantity(),
  yield: rate(),
  lastSyncedAt: timestamptz(),
});

// `casing` is applied by the dialect when SQL is emitted, so column.name here is still the
// TypeScript key. The snake_case half of the convention is asserted against generated DDL in
// migrations.integration.test.ts.
const columnsByName = Object.fromEntries(
  getTableConfig(probe).columns.map((column) => [column.name, column]),
);

describe('column conventions', () => {
  it('renders money, quantity, and rate as exact numeric', () => {
    expect(columnsByName['marketValue']?.getSQLType()).toBe('numeric(19, 4)');
    expect(columnsByName['shares']?.getSQLType()).toBe('numeric(24, 8)');
    expect(columnsByName['yield']?.getSQLType()).toBe('numeric(12, 8)');
  });

  it('hands numeric values to TypeScript as strings, not doubles', () => {
    // The type-level guarantee: if a builder ever switched to `mode: 'number'` this stops
    // compiling, which is the point.
    const value: typeof probe.$inferSelect.marketValue = '1234567890123.4567';
    expect(typeof value).toBe('string');
  });

  it('renders instants as timestamptz', () => {
    expect(columnsByName['lastSyncedAt']?.getSQLType()).toBe('timestamp with time zone');
  });
});
