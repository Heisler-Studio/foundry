import { pgTable, text } from 'drizzle-orm/pg-core';
import { money, quantity, rate, timestamptz } from '../../src/db/columns.ts';

// Stands in for the tables ENG-69 and ENG-71 will add, so the generate → migrate → round-trip
// path is exercised without this issue claiming any domain table.
export const moneyProbe = pgTable('money_probe', {
  id: text().primaryKey(),
  marketValue: money(),
  shares: quantity(),
  distributionYield: rate(),
  lastSyncedAt: timestamptz(),
});
