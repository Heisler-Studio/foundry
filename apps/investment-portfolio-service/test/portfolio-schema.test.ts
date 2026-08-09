import { getTableConfig, type PgTable } from 'drizzle-orm/pg-core';
import { describe, expect, it } from 'vitest';
import { account, balance, holding, lot, security, snapshot } from '../src/db/schema/portfolio.ts';

// The engine (ENG-72) and ingestion (ENG-70) read these names and types. Changing one is a
// deliberate act, so it has to change here too.
const shape = (table: PgTable) =>
  Object.fromEntries(getTableConfig(table).columns.map((c) => [c.name, c.getSQLType()]));

const references = (table: PgTable) =>
  getTableConfig(table)
    .foreignKeys.map((fk) => {
      const { columns, foreignTable } = fk.reference();
      return `${columns.map((c) => c.name).join(',')} -> ${getTableConfig(foreignTable).name}`;
    })
    .sort();

describe('portfolio state schema', () => {
  it('carries two independent sync clocks on the account', () => {
    expect(shape(account)).toEqual({
      id: 'uuid',
      brokerageAccountId: 'text',
      name: 'text',
      holdingsLastSyncedAt: 'timestamp with time zone',
      transactionsLastSyncedOn: 'date',
    });
  });

  it('describes a security by what a target needs to weight it', () => {
    expect(shape(security)).toEqual({
      id: 'uuid',
      ticker: 'text',
      name: 'text',
      assetClass: 'text',
      distributionYield: 'numeric(12, 8)',
      marginable: 'boolean',
    });
  });

  it('hangs holdings and balances off a snapshot so every number has one "as of"', () => {
    expect(shape(snapshot)).toEqual({
      id: 'uuid',
      accountId: 'uuid',
      capturedAt: 'timestamp with time zone',
    });
    expect(references(snapshot)).toEqual(['accountId -> account']);
    expect(references(holding)).toEqual(['securityId -> security', 'snapshotId -> snapshot']);
    expect(references(balance)).toEqual(['snapshotId -> snapshot']);
  });

  it('holds quantity and market value per security', () => {
    expect(shape(holding)).toEqual({
      id: 'uuid',
      snapshotId: 'uuid',
      securityId: 'uuid',
      quantity: 'numeric(24, 8)',
      marketValue: 'numeric(19, 4)',
    });
  });

  it('carries margin balance as its own column, not as negative cash', () => {
    expect(shape(balance)).toEqual({
      id: 'uuid',
      snapshotId: 'uuid',
      cash: 'numeric(19, 4)',
      marginBalance: 'numeric(19, 4)',
      buyingPower: 'numeric(19, 4)',
      totalValue: 'numeric(19, 4)',
    });
  });

  it('parents lots to the account and security, not to a snapshot', () => {
    expect(shape(lot)).toEqual({
      id: 'uuid',
      accountId: 'uuid',
      securityId: 'uuid',
      quantity: 'numeric(24, 8)',
      acquiredOn: 'date',
      pricePerShare: 'numeric(19, 4)',
      costBasis: 'numeric(19, 4)',
    });
    expect(references(lot)).toEqual(['accountId -> account', 'securityId -> security']);
  });

  it('requires every money column that arithmetic depends on', () => {
    const nullable = (table: PgTable) =>
      getTableConfig(table)
        .columns.filter((c) => !c.notNull)
        .map((c) => c.name);

    expect(nullable(balance)).toEqual([]);
    expect(nullable(holding)).toEqual([]);
    expect(nullable(lot)).toEqual([]);
    // Staleness is unknown until the first sync; curated security facts are unknown until set.
    expect(nullable(account)).toEqual(['holdingsLastSyncedAt', 'transactionsLastSyncedOn']);
    expect(nullable(security)).toEqual(['assetClass', 'distributionYield', 'marginable']);
  });
});
