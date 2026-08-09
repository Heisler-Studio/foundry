import { sql } from 'drizzle-orm';
import { check, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { rate, timestamptz } from '../columns.ts';
import { destination } from './destination.ts';
import { plan } from './plan.ts';

export const target = pgTable(
  'target',
  {
    id: uuid().defaultRandom().primaryKey(),
    planId: uuid()
      .notNull()
      .references(() => plan.id, { onDelete: 'cascade' }),
    /** The margin policy: the LTV this target will not exceed. Null means none declared. */
    maxLtv: rate(),
    createdAt: timestamptz().notNull().defaultNow(),
  },
  (table) => [
    unique('target_plan_unique').on(table.planId),
    check('target_max_ltv_range', sql`${table.maxLtv} between 0 and 1`),
  ],
);

export const allocation = pgTable(
  'allocation',
  {
    id: uuid().defaultRandom().primaryKey(),
    targetId: uuid()
      .notNull()
      .references(() => target.id, { onDelete: 'cascade' }),
    destinationId: uuid()
      .notNull()
      .references(() => destination.id, { onDelete: 'restrict' }),
    weight: rate().notNull(),
  },
  (table) => [
    unique('allocation_target_destination_unique').on(table.targetId, table.destinationId),
    check('allocation_weight_range', sql`${table.weight} between 0 and 1`),
    // Weights summing to 1 across a target is an engine invariant; a row check cannot see its
    // siblings, and a trigger would fire mid-write while the coach is still building the set.
  ],
);

export type Target = typeof target.$inferSelect;
export type Allocation = typeof allocation.$inferSelect;
