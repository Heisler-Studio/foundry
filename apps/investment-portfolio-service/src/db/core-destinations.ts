import type { Db } from './client.ts';
import { destination } from './schema/destination.ts';

/**
 * Margin paydown and cash exist whether or not anyone planned for them, so they are seeded on
 * boot rather than created by the first plan that happens to use one.
 */
export const ensureCoreDestinations = async (db: Db): Promise<void> => {
  await db
    .insert(destination)
    .values([{ kind: 'margin_paydown' }, { kind: 'cash' }])
    .onConflictDoNothing();
};
