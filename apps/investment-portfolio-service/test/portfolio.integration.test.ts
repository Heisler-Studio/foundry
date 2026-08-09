import { eq, sql } from 'drizzle-orm';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { DbHandle } from '../src/db/client.ts';
import { runMigrations } from '../src/db/migrate.ts';
import { account, balance, holding, lot, security, snapshot } from '../src/db/schema/portfolio.ts';
import { createTestDb } from './support/database.ts';

const databaseUrl = process.env.DATABASE_URL;

const reset = (handle: DbHandle) =>
  handle.db.execute(
    sql`drop table if exists lot, holding, balance, snapshot, security, account cascade`,
  );

const onlyId = (rows: { id: string }[]): string => {
  const [row] = rows;
  if (!row) throw new Error('insert returned no row');
  return row.id;
};

// Drizzle wraps driver errors, so the constraint that actually fired is on the cause. Asserting
// the name rather than the message keeps these tests about the schema and not about phrasing.
const constraintViolatedBy = async (write: PromiseLike<unknown>): Promise<string> => {
  try {
    await write;
  } catch (error) {
    const cause: unknown = (error as { cause?: unknown }).cause;
    if (typeof cause === 'object' && cause !== null && 'constraint' in cause) {
      return String((cause as { constraint: unknown }).constraint);
    }
    throw error;
  }
  return 'the write succeeded';
};

describe.skipIf(!databaseUrl)('portfolio state against Postgres 17', () => {
  let handle: DbHandle;
  let accountId: string;
  let securityId: string;

  const captureSnapshot = async (capturedAt?: Date) =>
    onlyId(
      await handle.db
        .insert(snapshot)
        .values({ accountId, capturedAt })
        .returning({ id: snapshot.id }),
    );

  beforeAll(async () => {
    handle = await createTestDb(databaseUrl as string);
    await reset(handle);
    await handle.db.execute(sql`drop schema if exists drizzle cascade`);
    await runMigrations(handle.db);

    accountId = onlyId(
      await handle.db
        .insert(account)
        .values({
          brokerageAccountId: 'cb630b98-1db5-4a3d-a022-98dce2b58330',
          name: 'Robinhood Individual',
        })
        .returning({ id: account.id }),
    );

    securityId = onlyId(
      await handle.db
        .insert(security)
        .values({
          ticker: 'QQQI',
          name: 'NEOS Nasdaq-100 High Income ETF',
          assetClass: 'income engine',
          distributionYield: '0.13820000',
          marginable: true,
        })
        .returning({ id: security.id }),
    );
  });

  afterAll(async () => {
    if (!handle) return;
    await reset(handle);
    await handle.db.execute(sql`drop schema if exists drizzle cascade`);
    await handle.close();
  });

  it('names columns in snake_case and keeps every money column exact', async () => {
    const { rows } = await handle.db.execute<{
      table_name: string;
      column_name: string;
      data_type: string;
    }>(
      sql`select table_name, column_name, data_type from information_schema.columns
          where table_schema = 'public' and table_name in ('account','balance','holding','lot','security','snapshot')
          order by table_name, column_name`,
    );

    const named = rows.map((r) => `${r.table_name}.${r.column_name}`);
    expect(named).toContain('account.holdings_last_synced_at');
    expect(named).toContain('account.transactions_last_synced_on');
    expect(named).toContain('balance.margin_balance');
    expect(named).toContain('holding.market_value');
    expect(named).toContain('lot.acquired_on');
    expect(named).toContain('lot.price_per_share');
    expect(named).toContain('lot.cost_basis');

    expect(rows.filter((r) => /real|double precision/.test(r.data_type))).toEqual([]);
  });

  it('keeps the holdings and transactions clocks independent', async () => {
    await handle.db
      .update(account)
      .set({
        holdingsLastSyncedAt: new Date('2026-08-09T00:34:11.225Z'),
        transactionsLastSyncedOn: '2026-08-08',
      })
      .where(eq(account.id, accountId));

    const [row] = await handle.db.select().from(account).where(eq(account.id, accountId));

    expect(row?.holdingsLastSyncedAt?.toISOString()).toBe('2026-08-09T00:34:11.225Z');
    // A bare string, so "which day" never depends on the reader's timezone.
    expect(row?.transactionsLastSyncedOn).toBe('2026-08-08');
  });

  it('round-trips a snapshot whose values a double would corrupt', async () => {
    const snapshotId = await captureSnapshot(new Date('2026-08-09T01:00:00Z'));

    await handle.db.insert(holding).values({
      snapshotId,
      securityId,
      quantity: '1234.56789012',
      marketValue: '1234567890123.4567',
    });
    await handle.db.insert(balance).values({
      snapshotId,
      cash: '-25000.0000',
      marginBalance: '25000.0000',
      buyingPower: '46140.5900',
      totalValue: '518952.9000',
    });

    const [heldRow] = await handle.db
      .select()
      .from(holding)
      .where(eq(holding.snapshotId, snapshotId));
    const [balanceRow] = await handle.db
      .select()
      .from(balance)
      .where(eq(balance.snapshotId, snapshotId));

    expect(heldRow?.marketValue).toBe('1234567890123.4567');
    expect(heldRow?.quantity).toBe('1234.56789012');
    expect(Number('1234567890123.4567').toString()).not.toBe('1234567890123.4567');

    // Margin arrives as negative cash and is stored as the positive liability LTV needs.
    expect(balanceRow?.cash).toBe('-25000.0000');
    expect(balanceRow?.marginBalance).toBe('25000.0000');
  });

  it('refuses a margin balance stored as negative cash', async () => {
    const snapshotId = await captureSnapshot();

    const violated = await constraintViolatedBy(
      handle.db.insert(balance).values({
        snapshotId,
        cash: '-25000.0000',
        marginBalance: '-25000.0000',
        buyingPower: '46140.5900',
        totalValue: '518952.9000',
      }),
    );

    expect(violated).toBe('balance_margin_balance_non_negative');
  });

  it('records one holding per security per snapshot', async () => {
    const snapshotId = await captureSnapshot();

    await handle.db
      .insert(holding)
      .values({ snapshotId, securityId, quantity: '1', marketValue: '1' });

    const violated = await constraintViolatedBy(
      handle.db.insert(holding).values({ snapshotId, securityId, quantity: '2', marketValue: '2' }),
    );

    expect(violated).toBe('holding_snapshot_security_key');
  });

  it('keeps a lot as a calendar-day acquisition fact, unattached to any snapshot', async () => {
    await handle.db.insert(lot).values({
      accountId,
      securityId,
      quantity: '125.00000000',
      acquiredOn: '2018-04-25',
      pricePerShare: '43.2100',
      costBasis: '5401.2500',
    });

    const [row] = await handle.db.select().from(lot).where(eq(lot.accountId, accountId));

    expect(row?.acquiredOn).toBe('2018-04-25');
    expect(row?.costBasis).toBe('5401.2500');
    // Basis diverges from quantity x price after a wash sale, so both are stored.
    expect(row?.pricePerShare).toBe('43.2100');
  });

  it('discards a snapshot without touching lots', async () => {
    const snapshotId = await captureSnapshot();
    await handle.db.insert(balance).values({
      snapshotId,
      cash: '100.0000',
      marginBalance: '0.0000',
      buyingPower: '100.0000',
      totalValue: '100.0000',
    });
    await handle.db.insert(lot).values({
      accountId,
      securityId,
      quantity: '10.00000000',
      acquiredOn: '2019-01-02',
      pricePerShare: '10.0000',
      costBasis: '100.0000',
    });
    const lotsBefore = await handle.db.select().from(lot).where(eq(lot.accountId, accountId));

    await handle.db.delete(snapshot).where(eq(snapshot.id, snapshotId));

    expect(
      await handle.db.select().from(balance).where(eq(balance.snapshotId, snapshotId)),
    ).toEqual([]);
    expect(await handle.db.select().from(lot).where(eq(lot.accountId, accountId))).toHaveLength(
      lotsBefore.length,
    );
  });
});
