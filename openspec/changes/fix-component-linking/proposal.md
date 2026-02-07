## Why

The current monorepo setup makes it hard for apps to consume `@foundry/react-native-components` without extra NativeWind/monorepo-specific configuration. This change removes that friction so shared components can be installed once in the package and reused consistently across apps.

## What Changes

- Make `@foundry/react-native-components` compatible with NativeWind's monorepo guidance so consuming apps do not need additional bespoke configuration beyond standard NativeWind setup.
- Establish a workflow for installing "raw" NativeWind-compatible components into `@foundry/react-native-components`, then exporting them as the package's public API.
- Define the supported extension points so apps can layer theme + style overrides on top of the base components (without forking the base components).
- Update integration verification to ensure components render and style correctly across platforms when consumed from the workspace package.

## Capabilities

### New Capabilities

- `nativewind-monorepo-compat`: `@foundry/react-native-components` can be consumed in pnpm-workspace apps following NativeWind's monorepo guidance, without requiring extra per-app configuration to make styles/components work.
- `component-theming-overrides`: Apps can apply theme and style overrides on top of exported base components in a documented, supported way.

### Modified Capabilities

- `package-initialization`: Update package requirements so the build/exports/layout support shipping installed raw components cleanly to consuming apps.
- `integration-verification`: Strengthen verification so consuming apps can import, render, and style components from the package with no additional bespoke configuration.
- `component-primitives`: Clarify/extend component requirements to support app-level overrides and theming layered on top of base styling.

## Impact

- `packages/react-native-components` structure, build output, and exports
- NativeWind configuration boundaries (what lives in the package vs what lives in apps)
- Consuming apps' component imports and styling/theming patterns
- Cross-platform verification (iOS/Android/Web) for shared component usage
