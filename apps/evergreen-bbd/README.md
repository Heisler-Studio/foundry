# Evergreen

Personal investment tracking for a margin account, built around the Buy-Borrow-Die strategy.

Expo SDK 57, expo-router, NativeWind 4 on Tailwind 3, and react-native-reusables components copied
into `src/components/ui/`.

Run from the monorepo root — see the [root README](../../README.md) for setup and the constraints
that apply here.

```bash
pnpm --filter evergreen-bbd dev        # expo start
pnpm --filter evergreen-bbd ios
pnpm --filter evergreen-bbd web
pnpm --filter evergreen-bbd typecheck
```

## Adding a component

```bash
cd apps/evergreen-bbd
npx @react-native-reusables/cli@latest add <component>
```

Components land in `src/components/ui/` as source you own. Browse them at
[reactnativereusables.com](https://reactnativereusables.com).

## Theme

Colours are HSL custom properties in `src/global.css`, mirrored as JS strings in `src/lib/theme.ts`
for React Navigation, which cannot read CSS variables. **Change both** — nothing keeps them in sync.
