## Why

This monorepo needs a centralized location for shared React Native components across all Expo universal apps. Currently, each app would need to independently configure and manage its own component library, leading to duplication and inconsistency. By establishing a dedicated `react-native-components` package based on react-native-reusables, we provide a foundation of pre-built, accessible, and customizable primitives that apps can import and extend with their own styling and business logic.

## What Changes

- Create new package `@foundry/react-native-components` in `packages/react-native-components/`
- Initialize package with TypeScript, proper build configuration, and exports
- Install and configure react-native-reusables as the component foundation
- Add initial primitive components: Card, Button, and Input
- Create comprehensive documentation (README, usage guides, component API docs)
- Add runbooks for package maintenance and component development
- Configure workspace dependency linking for cross-package imports
- Verify integration by importing and rendering Card component in `base-universal-app`

## Capabilities

### New Capabilities

- `package-initialization`: Create and configure the react-native-components package structure with proper TypeScript, build tools, and workspace integration
- `component-primitives`: Implement core UI primitives (Card, Button, Input) based on react-native-reusables patterns with proper TypeScript types and accessibility
- `documentation-suite`: Establish comprehensive documentation including README, component API docs, usage examples, and contribution guidelines
- `runbook-library`: Create operational runbooks for common tasks like adding new components, publishing updates, and troubleshooting
- `integration-verification`: Test and verify that components can be imported and used correctly in consuming apps

### Modified Capabilities

- None - this is a net-new package with no existing capability modifications

## Impact

- **Affected Code**: New package directory `packages/react-native-components/`, modifications to root `pnpm-workspace.yaml`, potential updates to `base-universal-app` for verification
- **APIs**: New package exports via `@foundry/react-native-components` namespace
- **Dependencies**: Adds react-native-reusables dependency, NativeWind/Tailwind CSS configuration for styling, TypeScript build pipeline
- **Systems**: pnpm workspace configuration, build tooling integration, documentation site structure
- **Team**: Establishes pattern for future shared packages and component libraries
