import { sql } from 'drizzle-orm';
import { check, pgEnum, pgTable, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { security } from './portfolio.ts';

/**
 * Where a dollar can go (ADR-0005). This is the table that keeps the app from being a
 * rebalancer: a rebalancer assumes every freed dollar buys something, so it only needs
 * securities. Retiring margin debt at ~5.5% is a certain, tax-free return that can beat any
 * purchase, and a schema that cannot name that destination cannot express the trade.
 */
export const destinationKind = pgEnum('destination_kind', ['security', 'margin_paydown', 'cash']);

export const destination = pgTable(
  'destination',
  {
    id: uuid().defaultRandom().primaryKey(),
    kind: destinationKind().notNull(),
    securityId: uuid().references(() => security.id, { onDelete: 'restrict' }),
  },
  (table) => [
    check(
      'destination_security_matches_kind',
      sql`(${table.kind} = 'security') = (${table.securityId} is not null)`,
    ),
    // Nulls are distinct in Postgres, so this constrains security rows only.
    uniqueIndex('destination_security_unique').on(table.securityId),
    // Margin paydown and cash are singletons: every plan's allocations and steps point at the
    // same row, so two competing "cash" destinations are not representable.
    uniqueIndex('destination_singleton_kind_unique')
      .on(table.kind)
      .where(sql`${table.kind} <> 'security'`),
  ],
);

export type Destination = typeof destination.$inferSelect;
