# Recipe: a new Expo app in this monorepo

This is the exact sequence used to build `apps/evergreen-bbd` on Expo SDK 57, NativeWind 4.2,
and react-native-reusables. It replaces a maintained base-app template — see
[ADR-0001](../adr/0001-no-base-app-template.md).

Verify against the versioned Expo docs for whatever SDK is current
(`https://docs.expo.dev/versions/vNN.0.0/`) before following this — the steps below drift with
each SDK.

## 1. Scaffold

```bash
cd apps
npx create-expo-app@latest <app-name> --template default --no-install
```

SDK 57's default template uses a `src/` layout and ships demo screens, an `AGENTS.md`, and an MIT
`LICENSE`. Delete the demo (`src/components`, `src/constants`, `src/hooks`, every route but
`index`), the unused files under `assets/images`, and the `LICENSE` if the app is not MIT.

Strip the template's demo-only dependencies too. For SDK 57 those were `@expo/ui`, `expo-device`,
`expo-glass-effect`, `expo-symbols`, `expo-image`, and `expo-web-browser`. Keep `expo-constants`,
`expo-font`, and `expo-linking` — expo-router needs them.

## 2. Install the styling stack

```bash
pnpm --filter <app-name> add nativewind tailwindcss@^3.4.19 tailwindcss-animate \
  class-variance-authority clsx tailwind-merge \
  @rn-primitives/portal @rn-primitives/slot lucide-react-native
pnpm --filter <app-name> add -D prettier-plugin-tailwindcss
cd apps/<app-name> && npx expo install react-native-svg
```

Tailwind must be **v3**. NativeWind 4 is built against it; NativeWind 5 (Tailwind 4) is still
pre-release. Use `npx expo install` for anything with a native module so the SDK picks the version.

## 3. Wire NativeWind

`babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
```

`metro.config.js` — `inlineRem: 16` is what react-native-reusables expects:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './src/global.css', inlineRem: 16 });
```

Then copy `tailwind.config.js`, `src/global.css`, `src/lib/theme.ts`, `src/lib/utils.ts`,
`nativewind-env.d.ts`, and `components.json` from `apps/evergreen-bbd`. Point the `content` glob and
the Metro `input` at wherever this app keeps source.

Add `nativewind-env.d.ts` to `include` in `tsconfig.json`, and create `expo-env.d.ts` containing
`/// <reference types="expo/types" />` — without it, `import '@/global.css'` fails to typecheck
(TS2882). Expo generates that file but gitignores it by default; this repo commits it so a clean
clone can typecheck.

## 4. Add components

```bash
npx @react-native-reusables/cli@latest add button text icon
```

The CLI reads `components.json` and the `tsconfig.json` path aliases, so components land in
`src/components/ui/`. They are copied source that you own — edit them freely.

## 5. Scripts

Name scripts to match the tasks in `turbo.json`, or Turborepo won't find them: `dev`, `build`,
`lint`, `typecheck`.

## 6. Verify

Both platforms, because web passing does not prove native works:

```bash
npx expo export --platform web
npx expo export --platform ios
npx tsc --noEmit
npx expo lint
```

## Known traps

- **`nodeLinker: hoisted` is mandatory** (set in `pnpm-workspace.yaml`). Metro resolves from disk
  rather than the importer's scope, so pnpm's isolated store hides transitive dependencies from the
  bundler. NativeWind's `react-native-css-interop` is the first to fail.
- **The theme is defined twice** — as HSL custom properties in `global.css` and as JS strings in
  `src/lib/theme.ts`. React Navigation styles native chrome from JS and cannot read CSS variables.
  Edit both or the two halves of the UI disagree.
- **`expo lint` writes ESLint deps into `package.json` without installing them** in a pnpm
  workspace. Run `pnpm install` afterwards.
