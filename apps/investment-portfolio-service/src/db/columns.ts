import { date, numeric, timestamp } from 'drizzle-orm/pg-core';

/**
 * Every money column in this service comes from here (ADR-0004).
 *
 * The easy way to undo that decision is on the TypeScript side, not in the DDL: Drizzle's
 * default numeric mode yields `string`, and `mode: 'number'` would parse every value through an
 * IEEE double on the way out — exact storage, lossy reads. Values arrive as strings, so
 * arithmetic belongs in a decimal library, never in `Number`.
 */

/** A dollar amount: market value, cost basis, margin balance, price per share. */
export const money = () => numeric({ precision: 19, scale: 4 });

/** A share count. Fractional shares and DRIP remainders need more scale than dollars do. */
export const quantity = () => numeric({ precision: 24, scale: 8 });

/** A ratio — LTV, equity %, target weight, distribution yield. Stored as a fraction (0.055),
 *  never as a percentage (5.5), so no reader has to guess which one it is. */
export const rate = () => numeric({ precision: 12, scale: 8 });

/** Any instant. Always `timestamptz`: `last_synced_at` is compared against wall-clock now to
 *  decide whether a plan is trustworthy, and a naive timestamp makes that comparison a guess. */
export const timestamptz = () => timestamp({ withTimezone: true, mode: 'date' });

/** A calendar day. Read as `'YYYY-MM-DD'` and never as a `Date`, because a `Date` is an instant
 *  and would make "which tax year did this lot land in" depend on the reader's timezone.
 *  Columns built from this end in `_on`, so `_at` always means an instant. */
export const calendarDate = () => date({ mode: 'string' });
