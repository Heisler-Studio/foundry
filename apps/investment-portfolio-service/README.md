# investment-portfolio-service

The local service behind [`evergreen-bbd`](../evergreen-bbd). It owns Postgres, the calculation
engine, the MCP server, and the HTTP API; the Expo app is a thin client over that API. Why a
service rather than on-device storage: [ADR-0004](../../docs/adr/0004-service-owned-postgres.md).

Today it is the skeleton: Postgres 17 in Compose, Drizzle wired for schema and migrations, a
migration runner, and `/health`. Schema arrives in ENG-69 and ENG-71, the engine in ENG-72.

## Running it

Configuration is environment variables, loaded from `.env` in this directory — Compose and
`node --env-file` both read it with no wrapper process. `.env` is gitignored; `.env.example` is
the checked-in template:

```bash
cp .env.example .env                             # then edit the password
pnpm db:up                                       # Postgres 17 on localhost:5433
pnpm db:migrate
pnpm dev
curl localhost:4000/health
```

`POSTGRES_PORT` is the host port for the container's 5432; it must match the port inside
`DATABASE_URL`.

The Postgres credentials here are local-only — the container is not exposed beyond localhost and
the database holds nothing that survives `pnpm db:reset`. A deployed instance gets its
`DATABASE_URL` from the platform's own secret store, injected as an environment variable; nothing
in `src/` reads a file or calls a secrets CLI, so that swap needs no code change.

`pnpm db:reset` drops the volume and starts clean. `pnpm db:down` stops the container and keeps it.

## Schema and migrations

Tables live in `src/db/schema/`, one file per area, re-exported from `index.ts`. Change a table,
then:

```bash
pnpm db:generate                                 # writes SQL into drizzle/
pnpm db:migrate
```

Generated SQL is committed. Migrations are applied by `src/db/migrate.ts` — the service runs them
itself on boot — never by `drizzle-kit push`, so what ran locally is what runs anywhere else.

### Column conventions

`src/db/columns.ts` is the only place a column type gets chosen. Use `money()`, `quantity()`,
`rate()`, and `timestamptz()`; do not reach for `numeric()` directly.

| Builder         | Postgres         | TypeScript | For                                                      |
| --------------- | ---------------- | ---------- | -------------------------------------------------------- |
| `money()`       | `numeric(19, 4)` | `string`   | market value, cost basis, margin balance, price          |
| `quantity()`    | `numeric(24, 8)` | `string`   | share counts, including DRIP fractions                   |
| `rate()`        | `numeric(12, 8)` | `string`   | LTV, equity %, weights, yields — fractions, not percents |
| `timestamptz()` | `timestamptz`    | `Date`     | any instant, `last_synced_at` included                   |

Money is `numeric` and never `real`/`double precision` — that is the reason this app is on
Postgres at all. The failure mode that is easy to reintroduce is on the TypeScript side: passing
`mode: 'number'` keeps the column exact and makes every _read_ lossy. Values come back as strings;
do arithmetic with a decimal library.

`test/schema-guard.test.ts` fails the build if a schema file uses `real`, `doublePrecision`,
`mode: 'number'`, or a bare `numeric()`.

Column names are `snake_case` in Postgres and `camelCase` in TypeScript, via `casing: 'snake_case'`
set in both `drizzle.config.ts` and `src/db/client.ts`. The two must agree.

## Tests

```bash
pnpm test                                        # unit only, when DATABASE_URL is unset
pnpm db:up && pnpm test                          # adds the Postgres integration tests
```

The integration tests skip themselves when `DATABASE_URL` is unset, so `pnpm test` at the repo
root does not require Docker. When it is set they create and use `<database>_test` on the same
server — they drop tables and the migration journal, so they never touch the database `pnpm dev`
is pointed at.
