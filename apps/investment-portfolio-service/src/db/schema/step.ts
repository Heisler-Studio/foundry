import { sql } from 'drizzle-orm';
import { type AnyPgColumn, check, integer, pgEnum, pgTable, unique, uuid } from 'drizzle-orm/pg-core';
import { money, timestamptz } from '../columns.ts';
import { destination } from './destination.ts';
import { plan } from './plan.ts';

/**
 * A step moves money against a destination rather than buying or selling, because the three
 * destinations are also the three sources: selling a security, drawing margin, and spending cash
 * are all `out_of` one, and buying, paying margin down, and accumulating cash are all `into` one.
 * Modelled as buy/sell instead, "pay the loan down with the proceeds" has no representation
 * (ADR-0005).
 */
export const stepDirection = pgEnum('step_direction', ['into', 'out_of']);

export const stepStatus = pgEnum('step_status', ['pending', 'done', 'skipped']);

export const step = pgTable(
  'step',
  {
    id: uuid().defaultRandom().primaryKey(),
    planId: uuid()
      .notNull()
      .references(() => plan.id, { onDelete: 'cascade' }),
    sequence: integer().notNull(),
    direction: stepDirection().notNull(),
    destinationId: uuid()
      .notNull()
      .references(() => destination.id, { onDelete: 'restrict' }),
    amount: money().notNull(),
    /** The calendar gate — a step held for a tax year or a settlement window. */
    earliestAt: timestamptz(),
    dependsOnStepId: uuid().references((): AnyPgColumn => step.id, { onDelete: 'set null' }),
    status: stepStatus().notNull().default('pending'),
    executedAt: timestamptz(),
  },
  (table) => [
    unique('step_plan_sequence_unique').on(table.planId, table.sequence),
    check('step_amount_positive', sql`${table.amount} > 0`),
    check(
      'step_no_self_dependency',
      sql`${table.dependsOnStepId} is null or ${table.dependsOnStepId} <> ${table.id}`,
    ),
    check(
      'step_executed_when_done',
      sql`(${table.status} = 'done') = (${table.executedAt} is not null)`,
    ),
    // Longer dependency cycles are an engine invariant — a row check cannot walk the chain.
  ],
);

export type Step = typeof step.$inferSelect;
