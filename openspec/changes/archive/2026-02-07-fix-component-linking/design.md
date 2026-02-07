## Context

Foundry is a pnpm workspace monorepo with shared packages and multiple apps. `@foundry/react-native-components` is intended to host shared React Native components implemented with NativeWind (`className`), but today consuming apps require extra, bespoke configuration to make workspace components compile and style correctly.

Current setup inventory:

- `apps/base-universal-app` (Expo + NativeWind v4)
  - Tailwind: `apps/base-universal-app/tailwind.config.js` (content includes only `./app/**` and `./components/**`)
  - NativeWind: `apps/base-universal-app/babel.config.js` uses `nativewind/babel`
  - Metro: `apps/base-universal-app/metro.config.js` uses `withNativeWind({ input: './global.css' })`
  - Global CSS: `apps/base-universal-app/global.css`
  - Existing repro usage: `apps/base-universal-app/components/example/StyledExample.tsx` imports from `@foundry/react-native-components`
- `apps/base-web` (Next.js + Tailwind v4)
  - Tailwind: `apps/base-web/app/globals.css` uses `@import "tailwindcss"`
  - PostCSS: `apps/base-web/postcss.config.mjs` uses `@tailwindcss/postcss`
  - Next: `apps/base-web/next.config.ts` uses `transpilePackages` for workspace libs

The target end state is:

- "Raw" NativeWind-compatible components can be added into `@foundry/react-native-components` (following NativeWind's monorepo guidance) and exported as stable package APIs.
- Consuming apps can import these components and rely on their base styling without extra app-specific hacks.
- Apps can layer theme and style overrides on top of the base components without forking the shared package.

Constraints:

- pnpm workspace linking (symlinks) affects module resolution and Tailwind content scanning paths.
- Metro (native) and the web bundler must both resolve and transpile the shared package consistently.

Verification targets (in-scope):

- `apps/base-universal-app` (Expo) on iOS, Android, and Web (`expo start --web`)

## Goals / Non-Goals

**Goals:**

- Make `@foundry/react-native-components` work in apps with a single "standard" NativeWind monorepo setup (no per-app bespoke fixes specific to this package).
- Ensure Tailwind content scanning includes component sources so NativeWind styles generate correctly when components live outside the app directory.
- Define an override/theming strategy that is explicit and stable (what apps are allowed to override and how).
- Keep the public API surface of `@foundry/react-native-components` clean and intentionally exported.

**Non-Goals:**

- Rewriting all existing components or introducing a brand-new design system.
- Implementing a full dynamic runtime theming system if Tailwind token-based theming is sufficient.
- Solving every workspace/package transpilation issue across the repo; this change targets the component package + consuming apps path.

## Decisions

1. Standardize NativeWind + Tailwind configuration boundaries

- Decision: Keep NativeWind/Tailwind compilation owned by apps, but provide a shared preset/helper so apps do not need ad-hoc, package-specific configuration.
- Rationale: NativeWind generates styles from the app's Tailwind compiler run; attempting to precompile styles inside the shared component package adds coupling and makes per-app theming harder.
- Alternative considered: Precompile and ship generated styles from the package. Rejected because it makes theming/overrides significantly harder and risks mismatches across platforms.

2. Ensure monorepo content scanning includes workspace component sources

- Decision: Provide a shared Tailwind preset (or shared config module) that centralizes the monorepo `content` globs to include `@foundry/react-native-components` sources (and other workspace packages that use `className`). Apps include this preset as part of their standard NativeWind setup.
- Rationale: Most "it works locally but not from a package" failures come from Tailwind not scanning files outside the app root. Centralizing globs removes per-app copy/paste and makes behavior consistent.
- Alternative considered: Instruct each app to manually add `../../packages/react-native-components/src/**/*` to `content`. Rejected as brittle and easy to drift.

3. Ship components in a bundler-friendly way for Metro + web

- Decision: Make the package exports compatible with Metro and web bundlers by ensuring the exported entrypoints resolve to transpileable React Native source (and types), and avoid patterns that require consumers to reach into internal paths.
- Rationale: Shared RN component packages in monorepos often work best when Metro can transpile the package code (via workspace linking) and Tailwind can scan the same source paths.
- Alternative considered: Only export built `dist/` JS. Kept as an option for tooling, but not relied upon as the only path for Metro in dev.

4. Theming + style override strategy: semantic tokens + wrapper-friendly APIs

- Decision: Base components use semantic Tailwind class tokens (e.g., `bg-surface`, `text-foreground`, `border-border`) and accept `className` (and/or slot-specific `className` props) that are merged last to allow overrides.
- Rationale: Semantic tokens allow apps to define theme values centrally (Tailwind theme extension) while keeping component internals stable. Merging user `className` last enables local overrides without forking.
- Alternative considered: Expose a runtime theme context in the package. Deferred; can be added later if token-based theming is insufficient.

5. Installing "raw" components into the package

- Decision: Treat installed upstream components as source files under `@foundry/react-native-components/src/` and re-export only through `src/index.ts`. Any upstream installation process must target this directory and avoid app-specific assumptions.
- Rationale: Keeping upstream components as source preserves compatibility with NativeWind's scanning + Metro transpilation and allows Foundry-specific wrappers without losing the upstream baseline.

## Risks / Trade-offs

- Tailwind content globs may accidentally grow too broad (slow builds) -> Scope globs to only workspace packages that export NativeWind components (e.g., `packages/**/src/**/*.{ts,tsx}` with allowlist/explicit package paths).
- Metro/web bundler differences can cause "works on web, breaks on native" -> Add an integration verification route/screen in at least one RN app and run it on iOS/Android/Web.
- Token contract drift across apps (different meanings for `surface`, `foreground`, etc.) -> Define a minimal semantic token list and document expected usage; apps override values but not semantics.
- Upstream component updates may introduce breaking changes -> Pin upstream version or snapshot files; wrap exported components so Foundry API remains stable.

## Verification

- Tailwind content scanning includes `@foundry/react-native-components` (Tailwind build generates `.bg-card` when run from `apps/base-universal-app`)
- Bundling succeeds: `pnpm --filter base-universal-app exec expo export --platform ios`, `--platform android`, `--platform web`

## Migration Plan

1. Add shared Tailwind preset/config module to centralize monorepo `content` and any required presets/plugins.
2. Update consuming apps to adopt the shared preset as part of their standard NativeWind setup.
3. Update `@foundry/react-native-components` exports/entrypoints so Metro + web resolve the intended source.
4. Install a representative set of "raw" components into the package, export them, and verify rendering + styling in a consuming app.
5. Rollback: revert apps to prior Tailwind config and keep components package exports unchanged.

## Open Questions

- Which apps are in scope for "standard" verification (Expo app(s), Next.js web app, both)?
- Do we want a single root Tailwind config for the repo, or per-app configs that all import the same shared preset?
- What is the minimal semantic token set we want to standardize first (colors, spacing, radii, typography)?
