# Foundry

Heisler Studio's monorepo — Expo apps and the packages they share.

## Layout

```
apps/                       deployable units — an app is not necessarily an Expo app
  evergreen-bbd/            Expo SDK 57 app — personal investment tracking for a margin account
  investment-portfolio-service/  Node service: Postgres, engine, MCP, HTTP API (ADR-0004)
packages/                   shared packages (none yet — see ADR-0001)
docs/
  adr/                      architecture decisions
  design/                   agreed designs, per app
  recipes/                  reproducible setup procedures
```

## Prerequisites

Node 24.19 LTS and pnpm 10.28, both pinned in `.tool-versions` (asdf installs them). Turborepo is a
workspace dependency — no global install.

```bash
pnpm install
```

## Commands

Run from the root; Turborepo fans them out across workspaces.

```bash
pnpm dev          # start every workspace's dev task
pnpm build        # export bundles
pnpm lint
pnpm typecheck
pnpm test
pnpm format       # prettier, with Tailwind class sorting
```

Target one workspace with `pnpm --filter evergreen-bbd <script>`.

The service needs Docker and 1Password —
[`apps/investment-portfolio-service/README.md`](apps/investment-portfolio-service/README.md) has the loop.

## Adding an app

Follow [docs/recipes/new-expo-app.md](docs/recipes/new-expo-app.md). There is deliberately no base
app to copy — [ADR-0001](docs/adr/0001-no-base-app-template.md) explains why.

## Things that will bite you

- **`nodeLinker: hoisted` in `pnpm-workspace.yaml` is load-bearing.** Metro resolves modules from
  disk rather than from the importing package's scope, so pnpm's isolated store hides transitive
  dependencies from the bundler. Removing it breaks NativeWind.
- **Tailwind is pinned to v3.** NativeWind 4 requires it — see
  [ADR-0002](docs/adr/0002-nativewind-4-on-tailwind-3.md).
- **The theme lives in two files.** `src/global.css` holds HSL custom properties for NativeWind;
  `src/lib/theme.ts` holds the same values as JS strings for React Navigation, which cannot read CSS
  variables. Change both together.
- **A shared package needs a real consumer** or it breaks silently. That consumer is an app, never a
  template.

## Tracking

Work is tracked in Linear (`heisler-studio`, team `ENG`) — see `.linear.toml`.

## History

This repo was reset on 2026-08-04. Everything prior — a base universal app, a Next.js app, and four
packages, all several Expo SDKs behind — is preserved at the `pre-reset` tag and reachable with
`git show pre-reset:<path>`.
