# A local service owns Postgres; the Expo app is a client

Evergreen BBD has two consumers of the same data: the Expo UI and an MCP server that Claude drives.
An Expo app storing data on-device with `expo-sqlite` cannot share that file with an MCP server
running as a Node process, so on-device storage means two databases and a sync problem for a
single user on day one. Instead a local service owns Postgres, the calculation engine, the MCP
server, and an HTTP API; the Expo app is a thin client over that API.

Postgres from the start — not SQLite with a migration later.

## Why Postgres and not SQLite

Correctness, not future-proofing. **SQLite has no decimal type** — numbers are `REAL` (IEEE
float) or `TEXT`. This app computes cost basis, realized gains, and LTV, and float error in a gain
calculation is the kind of bug that costs an evening and permanently damages trust in the tool.
Postgres has `numeric`, which is exact. Money columns are `numeric`, always.

Migrating later is not free either: every migration rewritten, every money column re-verified, and
float drift hunted retroactively at exactly the moment the project is trying to ship features.
Docker Postgres is ten lines of compose and starts in two seconds.

Secondary: no native enums, weaker JSON, no `timestamptz`, and different upsert semantics — all
dialect divergence that would surface during a migration rather than now.

## Consequences

The engine lives in the service, so MCP and the UI share it for free, and it is plain TypeScript
testable without a simulator. Putting calculation in the app would mean writing it twice.

The app only works while the service is running, and a phone needs to be on the same network to
reach it. Accepted: single user, local, POC.

Hosting later is a deploy target, not a rewrite — the same service runs against managed Postgres
and the client changes a base URL. Neon or Supabase when that day comes.
