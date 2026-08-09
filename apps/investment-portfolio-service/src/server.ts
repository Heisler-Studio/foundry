import { createServer, type Server } from 'node:http';
import type { Db } from './db/client.ts';
import { checkHealth } from './health.ts';

const json = (body: unknown, status: number) => ({
  status,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

export const createHttpServer = (db: Db): Server =>
  createServer((req, res) => {
    const handle = async () => {
      if (req.url === '/health') {
        const health = await checkHealth(db);
        return json(health, health.status === 'ok' ? 200 : 503);
      }
      return json({ error: 'not found' }, 404);
    };

    handle()
      .then(({ status, headers, body }) => res.writeHead(status, headers).end(body))
      .catch((error: unknown) => {
        console.error('request failed', error);
        if (!res.headersSent) res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'internal error' }));
      });
  });
