import { sql } from 'drizzle-orm';
import {
  type AnyPgColumn,
  check,
  integer,
  pgEnum,
  pgTable,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import { money, timestamptz } from '../columns.ts';
import { destination } from './destination.ts';
import { plan } from './plan.ts';

/**
 * A move goes into or out of a destination rather than buying or selling, because the three
 * destinations are also the three sources: selling a security, drawing margin, and spending cash
 * are all `out_of` one, and buying, paying margin down, and accumulating cash are all `into` one.
 * Modelled as buy/sell instead, "pay the loan down with the proceeds" has no representation
 * (ADR-0005).
 */
export const moveDirection = pgEnum('move_direction', ['into', 'out_of']);

export const moveStatus = pgEnum('move_status', ['pending', 'done', 'skipped']);

export const move = pgTable(
  'move',
  {
    id: uuid().defaultRandom().primaryKey(),
    planId: uuid()
      .notNull()
      .references(() => plan.id, { onDelete: 'cascade' }),
    sequence: integer().notNull(),
    direction: moveDirection().notNull(),
    destinationId: uuid()
      .notNull()
      .references(() => destination.id, { onDelete: 'restrict' }),
    amount: money().notNull(),
    /** The calendar gate — a move held for a tax year or a settlement window. */
    earliestAt: timestamptz(),
    dependsOnMoveId: uuid().references((): AnyPgColumn => move.id, { onDelete: 'set null' }),
    status: moveStatus().notNull().default('pending'),
    executedAt: timestamptz(),
  },
  (table) => [
    unique('move_plan_sequence_unique').on(table.planId, table.sequence),
    check('move_amount_positive', sql`${table.amount} > 0`),
    check(
      'move_no_self_dependency',
      sql`${table.dependsOnMoveId} is null or ${table.dependsOnMoveId} <> ${table.id}`,
    ),
    check(
      'move_executed_when_done',
      sql`(${table.status} = 'done') = (${table.executedAt} is not null)`,
    ),
    // Longer dependency cycles are an engine invariant — a row check cannot walk the chain.
  ],
);

export type Move = typeof move.$inferSelect;
