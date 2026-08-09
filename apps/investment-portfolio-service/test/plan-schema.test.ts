import { getTableConfig } from 'drizzle-orm/pg-core';
import { describe, expect, it } from 'vitest';
import { plan } from '../src/db/schema/plan.ts';
import { destinationKind } from '../src/db/schema/destination.ts';
import { step, stepDirection } from '../src/db/schema/step.ts';

describe('the plan model', () => {
  it('offers margin paydown and cash alongside securities', () => {
    expect(destinationKind.enumValues).toEqual(['security', 'margin_paydown', 'cash']);
  });

  it('directs steps at a destination rather than buying and selling', () => {
    expect(stepDirection.enumValues).toEqual(['into', 'out_of']);

    const columns = getTableConfig(step).columns.map((column) => column.name);
    expect(columns).toContain('destinationId');
    // A buy/sell column would make "pay the loan down with the proceeds" unrepresentable.
    expect(columns).not.toContain('side');
    expect(columns).not.toContain('action');
  });

  it('constrains active plans with a partial unique index', () => {
    const index = getTableConfig(plan).indexes.find(
      (candidate) => candidate.config.name === 'plan_single_active',
    );

    expect(index?.config.unique).toBe(true);
    expect(index?.config.where).toBeDefined();
  });
});
