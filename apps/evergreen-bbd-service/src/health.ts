import { sql } from 'drizzle-orm';
import type { Db } from './db/client.ts';

export type Health = {
  status: 'ok' | 'degraded';
  database: 'up' | 'down';
  checkedAt: string;
};

export const checkHealth = async (db: Db): Promise<Health> => {
  const checkedAt = new Date().toISOString();

  try {
    await db.execute(sql`select 1`);
    return { status: 'ok', database: 'up', checkedAt };
  } catch {
    return { status: 'degraded', database: 'down', checkedAt };
  }
};
