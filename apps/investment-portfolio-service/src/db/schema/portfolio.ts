import { sql } from 'drizzle-orm';
import { boolean, check, index, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core';
import { calendarDate, money, quantity, rate, timestamptz } from '../columns.ts';

// Entities and their columns come from `docs/design/evergreen-bbd-poc.md` § Domain model.

export const account = pgTable('account', {
  id: uuid().primaryKey().defaultRandom(),
  brokerageAccountId: text().notNull().unique('account_brokerage_account_id_key'),
  name: text().notNull(),
  // Two clocks, not one: holdings and transactions sync independently and can be days apart, so
  // the portfolio can be current on positions and stale on activity. Collapsing them hides
  // exactly the staleness the UI exists to surface. The transactions clock arrives as a date.
  holdingsLastSyncedAt: timestamptz(),
  transactionsLastSyncedOn: calendarDate(),
});

export const security = pgTable('security', {
  id: uuid().primaryKey().defaultRandom(),
  ticker: text().notNull().unique('security_ticker_key'),
  name: text().notNull(),
  // Free text until the destination taxonomy is settled — the design doc leaves it open.
  assetClass: text(),
  distributionYield: rate(),
  // Null is unknown, which is not known-ineligible. No broker field supplies this.
  marginable: boolean(),
});

// Holdings and balances hang off a snapshot rather than off the account, so every number on
// screen has exactly one "as of" and change over time is a query rather than a bookkeeping rule.
export const snapshot = pgTable(
  'snapshot',
  {
    id: uuid().primaryKey().defaultRandom(),
    accountId: uuid()
      .notNull()
      .references(() => account.id, { onDelete: 'cascade' }),
    capturedAt: timestamptz().notNull().defaultNow(),
  },
  (t) => [index('snapshot_account_captured_at_idx').on(t.accountId, t.capturedAt)],
);

export const holding = pgTable(
  'holding',
  {
    id: uuid().primaryKey().defaultRandom(),
    snapshotId: uuid()
      .notNull()
      .references(() => snapshot.id, { onDelete: 'cascade' }),
    securityId: uuid()
      .notNull()
      .references(() => security.id),
    quantity: quantity().notNull(),
    marketValue: money().notNull(),
  },
  (t) => [unique('holding_snapshot_security_key').on(t.snapshotId, t.securityId)],
);

export const balance = pgTable(
  'balance',
  {
    id: uuid().primaryKey().defaultRandom(),
    snapshotId: uuid()
      .notNull()
      .unique('balance_snapshot_id_key')
      .references(() => snapshot.id, { onDelete: 'cascade' }),
    // Signed, as the broker reports it: negative when margin is drawn.
    cash: money().notNull(),
    // A liability, so never negative — derived at ingestion as `max(0, -cash)`. The broker's
    // balance model is `currency`/`cash`/`buying_power` and carries no margin, liability, or
    // leverage field at all; LTV and equity % need the positive figure, so the inversion happens
    // once, here, on the way in.
    marginBalance: money().notNull(),
    buyingPower: money().notNull(),
    totalValue: money().notNull(),
  },
  (t) => [check('balance_margin_balance_non_negative', sql`${t.marginBalance} >= 0`)],
);

// Parented to the account and security rather than to a snapshot-scoped `holding` row: a lot is
// an acquisition fact that does not change between syncs, and re-parenting every lot on every
// refresh would make the CSV backfill — the only row source in sight — meaningless. Nothing
// populates this yet; the broker returns `tax_lots` empty on every position.
export const lot = pgTable(
  'lot',
  {
    id: uuid().primaryKey().defaultRandom(),
    accountId: uuid()
      .notNull()
      .references(() => account.id, { onDelete: 'cascade' }),
    securityId: uuid()
      .notNull()
      .references(() => security.id),
    quantity: quantity().notNull(),
    acquiredOn: calendarDate().notNull(),
    pricePerShare: money().notNull(),
    // Not derived from `pricePerShare`: wash-sale adjustments move basis away from what was paid,
    // and the adjusted figure is the one gains are computed against.
    costBasis: money().notNull(),
  },
  (t) => [index('lot_account_security_idx').on(t.accountId, t.securityId)],
);
