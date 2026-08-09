import { sql } from 'drizzle-orm';
import { check, pgEnum, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { timestamptz } from '../columns.ts';

export const planStatus = pgEnum('plan_status', [
  'draft',
  'candidate',
  'active',
  'completed',
  'abandoned',
]);

export const plan = pgTable(
  'plan',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: text().notNull(),
    status: planStatus().notNull().default('draft'),
    acceptedAt: timestamptz(),
    createdAt: timestamptz().notNull().defaultNow(),
  },
  (table) => [
    /**
     * In Postgres rather than in the accept path, because "which plan am I executing" has to
     * have one answer even if two writers race. The index holds the ceiling only — zero active
     * plans is legitimate before the first acceptance and after one completes, so "at least
     * one" belongs to the caller.
     */
    uniqueIndex('plan_single_active')
      .on(table.status)
      .where(sql`${table.status} = 'active'`),
    check(
      'plan_active_was_accepted',
      sql`${table.status} <> 'active' or ${table.acceptedAt} is not null`,
    ),
  ],
);

export type Plan = typeof plan.$inferSelect;
