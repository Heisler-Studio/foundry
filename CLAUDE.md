# Foundry

Monorepo for Heisler Studio's Expo apps. Read `README.md` for layout and commands, `docs/adr/` for
decisions already made, and `docs/recipes/` for procedures.

## Before writing Expo code

Read the versioned docs for the SDK in use — `https://docs.expo.dev/versions/v57.0.0/` — not
training memory. Expo's APIs move every SDK, and this repo tracks the current release. Use
`context7` for any other library.

## Package management

pnpm only. Internal packages link with the workspace protocol:

```bash
pnpm add @foundry/<name> --filter <app> --workspace
```

Use `npx expo install <pkg>` inside an app for anything with a native module, so the SDK chooses the
version.

## Constraints that look like mistakes

- `nodeLinker: hoisted` in `pnpm-workspace.yaml` is required. Metro resolves from disk, not the
  importer's scope, so an isolated store hides transitive deps from the bundler. Do not remove it.
- Tailwind is pinned to v3 because NativeWind 4 requires it (ADR-0002). Do not upgrade to v4.
- The theme is defined twice — `src/global.css` for NativeWind, `src/lib/theme.ts` for React
  Navigation, which cannot read CSS variables. Edit both; do not "deduplicate" them.

## Code style

- Functional. No classes — functions and closures.
- Small files, one clear purpose each.
- Prefer `type` over `interface`. Avoid `any`; use `unknown` with a type guard.
- Comments explain a non-obvious _why_. Do not narrate what the code already says.

## Before saying work is done

```bash
pnpm typecheck && pnpm lint
```

For anything touching styling or navigation, also export both platforms — a passing web bundle does
not prove native works:

```bash
pnpm --filter <app> exec expo export --platform web
pnpm --filter <app> exec expo export --platform ios
```

## Tracking

Linear, workspace `heisler-studio`, team `ENG` (`.linear.toml`). Use the `linear` CLI.
