import { and, eq, sql } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { DbHandle } from '../src/db/client.ts';
import { ensureCoreDestinations } from '../src/db/core-destinations.ts';
import { runMigrations } from '../src/db/migrate.ts';
import { allocation, destination, plan, security, step, target } from '../src/db/schema/index.ts';
import { createTestDb } from './support/database.ts';

const databaseUrl = process.env.DATABASE_URL;

// One statement per execute: node-postgres' extended protocol refuses a multi-statement query.
const dropStatements = [
  sql`drop table if exists "allocation", "step", "target", "plan", "destination" cascade`,
  sql`drop type if exists "plan_status", "destination_kind", "step_direction", "step_status" cascade`,
  sql`drop schema if exists drizzle cascade`,
];

const draft = (name: string) => ({ name, status: 'draft' as const });
const accepted = (name: string) => ({ name, status: 'active' as const, acceptedAt: new Date() });

// Drizzle wraps the driver error, so the constraint name lives on the cause rather than the
// message. Asserting the name is the point: it proves Postgres refused the write, not the app.
const rejectedBy = async (constraint: string, write: () => Promise<unknown>): Promise<void> => {
  const error = await write().then(
    () => undefined,
    (thrown: unknown) => thrown,
  );

  expect(error, `expected ${constraint} to reject the write`).toBeDefined();
  expect((error as { cause?: { constraint?: string } }).cause?.constraint).toBe(constraint);
};

describe.skipIf(!databaseUrl)('the plan model against Postgres 17', () => {
  let handle: DbHandle;

  const destinationFor = async (kind: 'margin_paydown' | 'cash'): Promise<string> => {
    const [row] = await handle.db.select().from(destination).where(eq(destination.kind, kind));
    if (!row) throw new Error(`${kind} destination missing`);
    return row.id;
  };

  const securityFor = async (ticker: string): Promise<string> => {
    const [row] = await handle.db
      .insert(security)
      .values({ ticker, name: ticker })
      .onConflictDoUpdate({ target: security.ticker, set: { name: ticker } })
      .returning();
    return row!.id;
  };

  const securityDestination = async (ticker: string): Promise<string> => {
    const [row] = await handle.db
      .insert(destination)
      .values({ kind: 'security', securityId: await securityFor(ticker) })
      .returning();
    return row!.id;
  };

  beforeAll(async () => {
    handle = await createTestDb(databaseUrl as string);
    for (const statement of dropStatements) await handle.db.execute(statement);
    await runMigrations(handle.db);
  });

  afterAll(async () => {
    if (!handle) return;
    for (const statement of dropStatements) await handle.db.execute(statement);
    await handle.close();
  });

  beforeEach(async () => {
    await handle.db.execute(
      sql`truncate "plan", "destination", "security" restart identity cascade`,
    );
    await ensureCoreDestinations(handle.db);
  });

  describe('destinations', () => {
    it('seeds margin paydown and cash, and stays idempotent', async () => {
      await ensureCoreDestinations(handle.db);
      await ensureCoreDestinations(handle.db);

      const rows = await handle.db.select().from(destination);
      expect(rows.map((row) => row.kind).sort()).toEqual(['cash', 'margin_paydown']);
    });

    it('refuses a second cash destination', async () => {
      await rejectedBy('destination_singleton_kind_unique', () =>
        handle.db.insert(destination).values({ kind: 'cash' }),
      );
    });

    it('refuses a security destination naming no security, and a cash one naming a security', async () => {
      await rejectedBy('destination_security_matches_kind', () =>
        handle.db.insert(destination).values({ kind: 'security' }),
      );
      await rejectedBy('destination_security_matches_kind', async () =>
        handle.db
          .insert(destination)
          .values({ kind: 'cash', securityId: await securityFor('VOO') }),
      );
    });

    it('allows many security destinations but only one per security', async () => {
      await securityDestination('VOO');
      await securityDestination('QQQI');

      await rejectedBy('destination_security_unique', () => securityDestination('VOO'));
    });
  });

  describe('the one active plan', () => {
    it('accepts many candidates and only one active plan', async () => {
      await handle.db.insert(plan).values([draft('index and trim'), draft('income first')]);
      await handle.db.insert(plan).values(accepted('income first, accepted'));

      await rejectedBy('plan_single_active', () =>
        handle.db.insert(plan).values(accepted('a second commitment')),
      );
    });

    it('frees the slot when the active plan is abandoned', async () => {
      const [first] = await handle.db.insert(plan).values(accepted('first')).returning();

      await handle.db.update(plan).set({ status: 'abandoned' }).where(eq(plan.id, first!.id));
      await handle.db.insert(plan).values(accepted('second'));

      const active = await handle.db.select().from(plan).where(eq(plan.status, 'active'));
      expect(active.map((row) => row.name)).toEqual(['second']);
    });

    it('refuses to promote a draft to active without recording the acceptance', async () => {
      const [row] = await handle.db.insert(plan).values(draft('unaccepted')).returning();

      await rejectedBy('plan_active_was_accepted', () =>
        handle.db.update(plan).set({ status: 'active' }).where(eq(plan.id, row!.id)),
      );
    });
  });

  describe('a target weighting all three destination kinds', () => {
    it('holds weights against a security, margin paydown, and cash', async () => {
      const [row] = await handle.db.insert(plan).values(draft('deleverage first')).returning();
      const [declared] = await handle.db
        .insert(target)
        .values({ planId: row!.id, maxLtv: '0.25000000' })
        .returning();

      await handle.db.insert(allocation).values([
        {
          targetId: declared!.id,
          destinationId: await securityDestination('QQQI'),
          weight: '0.50000000',
        },
        {
          targetId: declared!.id,
          destinationId: await destinationFor('margin_paydown'),
          weight: '0.40000000',
        },
        {
          targetId: declared!.id,
          destinationId: await destinationFor('cash'),
          weight: '0.10000000',
        },
      ]);

      const weights = await handle.db
        .select({ weight: allocation.weight })
        .from(allocation)
        .where(eq(allocation.targetId, declared!.id));

      expect(weights).toHaveLength(3);
      expect(weights.map((entry) => Number(entry.weight)).reduce((a, b) => a + b, 0)).toBeCloseTo(
        1,
      );
    });

    it('refuses a second weight against the same destination', async () => {
      const [row] = await handle.db.insert(plan).values(draft('duplicate')).returning();
      const [declared] = await handle.db.insert(target).values({ planId: row!.id }).returning();
      const cash = await destinationFor('cash');

      await handle.db
        .insert(allocation)
        .values({ targetId: declared!.id, destinationId: cash, weight: '0.10000000' });

      await rejectedBy('allocation_target_destination_unique', () =>
        handle.db
          .insert(allocation)
          .values({ targetId: declared!.id, destinationId: cash, weight: '0.20000000' }),
      );
    });

    it('holds one target per plan', async () => {
      const [row] = await handle.db.insert(plan).values(draft('two targets')).returning();
      await handle.db.insert(target).values({ planId: row!.id });

      await rejectedBy('target_plan_unique', () =>
        handle.db.insert(target).values({ planId: row!.id }),
      );
    });
  });

  describe('a path that sells to retire debt', () => {
    it('sequences a sale out of a security into a margin paydown', async () => {
      const [row] = await handle.db.insert(plan).values(accepted('retire the loan')).returning();
      const voo = await securityDestination('VOO');

      const [sale] = await handle.db
        .insert(step)
        .values({
          planId: row!.id,
          sequence: 1,
          direction: 'out_of',
          destinationId: voo,
          amount: '42000.0000',
          earliestAt: new Date('2027-01-02T00:00:00Z'),
        })
        .returning();

      const [paydown] = await handle.db
        .insert(step)
        .values({
          planId: row!.id,
          sequence: 2,
          direction: 'into',
          destinationId: await destinationFor('margin_paydown'),
          amount: '42000.0000',
          dependsOnStepId: sale!.id,
        })
        .returning();

      expect(paydown!.dependsOnStepId).toBe(sale!.id);
      expect(paydown!.amount).toBe('42000.0000');
      expect(paydown!.status).toBe('pending');
    });

    it('refuses two steps at the same position on one path', async () => {
      const [row] = await handle.db.insert(plan).values(draft('collision')).returning();
      const cash = await destinationFor('cash');
      const values = {
        planId: row!.id,
        sequence: 1,
        direction: 'into' as const,
        destinationId: cash,
        amount: '100.0000',
      };

      await handle.db.insert(step).values(values);
      await rejectedBy('step_plan_sequence_unique', () => handle.db.insert(step).values(values));
    });

    it('refuses a step marked done without an execution date', async () => {
      const [row] = await handle.db.insert(plan).values(draft('half done')).returning();

      const cash = await destinationFor('cash');

      await rejectedBy('step_executed_when_done', () =>
        handle.db.insert(step).values({
          planId: row!.id,
          sequence: 1,
          direction: 'into',
          destinationId: cash,
          amount: '100.0000',
          status: 'done',
        }),
      );
    });

    it('refuses a zero-dollar step', async () => {
      const [row] = await handle.db.insert(plan).values(draft('nothing')).returning();

      const cash = await destinationFor('cash');

      await rejectedBy('step_amount_positive', () =>
        handle.db.insert(step).values({
          planId: row!.id,
          sequence: 1,
          direction: 'into',
          destinationId: cash,
          amount: '0.0000',
        }),
      );
    });
  });

  describe('discarding a plan', () => {
    it('takes its target, weights, and steps with it', async () => {
      const [row] = await handle.db.insert(plan).values(draft('disposable')).returning();
      const [declared] = await handle.db.insert(target).values({ planId: row!.id }).returning();
      const cash = await destinationFor('cash');

      await handle.db
        .insert(allocation)
        .values({ targetId: declared!.id, destinationId: cash, weight: '1.00000000' });
      await handle.db.insert(step).values({
        planId: row!.id,
        sequence: 1,
        direction: 'into',
        destinationId: cash,
        amount: '100.0000',
      });

      await handle.db.delete(plan).where(eq(plan.id, row!.id));

      expect(await handle.db.select().from(target)).toHaveLength(0);
      expect(await handle.db.select().from(allocation)).toHaveLength(0);
      expect(await handle.db.select().from(step)).toHaveLength(0);
    });

    it('keeps the destination, which outlives every plan that pointed at it', async () => {
      const [row] = await handle.db.insert(plan).values(draft('transient')).returning();
      const cash = await destinationFor('cash');

      await handle.db.insert(step).values({
        planId: row!.id,
        sequence: 1,
        direction: 'into',
        destinationId: cash,
        amount: '100.0000',
      });

      await rejectedBy('step_destination_id_destination_id_fk', () =>
        handle.db.delete(destination).where(eq(destination.id, cash)),
      );

      await handle.db.delete(plan).where(eq(plan.id, row!.id));
      const survivors = await handle.db
        .select()
        .from(destination)
        .where(and(eq(destination.kind, 'cash'), eq(destination.id, cash)));
      expect(survivors).toHaveLength(1);
    });
  });
});
