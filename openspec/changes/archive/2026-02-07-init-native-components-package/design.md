## Context

This monorepo uses pnpm workspaces to share code across multiple applications. Currently, there is no centralized location for React Native UI components, meaning each app would need to configure and maintain its own component library. This leads to duplication, inconsistency, and increased maintenance overhead.

The `react-native-reusables` project provides a collection of accessible, customizable React Native components built on top of NativeWind and React Native. By establishing a shared package that wraps and extends these primitives, we provide a single source of truth for UI components while allowing apps to customize styling and behavior as needed.

## Goals / Non-Goals

**Goals:**

- Create a properly configured TypeScript package that can be imported by Expo universal apps
- Establish a pattern for extending react-native-reusables components with project-specific defaults
- Provide initial set of essential primitives (Card, Button, Input) as proof of concept
- Create comprehensive documentation and runbooks for package maintenance
- Verify the integration works by importing components into `base-universal-app`

**Non-Goals:**

- Building a complete component library (only primitives for now)
- Implementing custom component logic (rely on react-native-reusables)
- Adding complex theming or design system management (defer to app-level)
- Publishing to npm (internal workspace package only)
- Supporting web-only or non-React Native environments

## Decisions

### Package Structure: Single Entry Point vs Component Exports

**Decision**: Use a single entry point with named exports (`index.ts`) for all components.

**Rationale**:

- Simplifies imports: `import { Card, Button } from '@foundry/react-native-components'`
- Consistent with react-native-reusables patterns
- Easier to maintain and discover
- Tree-shaking works with modern bundlers

**Alternative considered**: Individual file exports (e.g., `import Card from '@foundry/react-native-components/Card'`) - rejected for simplicity and consistency with the source library.

### Styling Approach: NativeWind with Default Classes

**Decision**: Components will use NativeWind classes with sensible defaults that can be overridden.

**Rationale**:

- react-native-reusables is built on NativeWind
- Provides both default styling and customization flexibility
- Apps can override via className props
- Consistent with Tailwind CSS ecosystem already in use

### Documentation Structure: README + Runbooks + JSDoc

**Decision**: Three-tier documentation approach:

1. **README.md**: Installation, basic usage, API overview
2. **Runbooks/**: Step-by-step guides for common tasks
3. **JSDoc**: Inline component documentation for IDE support

**Rationale**:

- Different audiences need different detail levels
- Runbooks provide repeatable processes
- JSDoc keeps docs close to code and provides IDE autocomplete

### Package Build: TypeScript Only (No Bundling)

**Decision**: Use TypeScript compilation only, no additional bundling (webpack, rollup, etc.).

**Rationale**:

- Metro (React Native bundler) handles tree-shaking and optimization
- Simpler build pipeline
- Faster development cycles
- Components remain readable source code

**Alternative considered**: Rollup bundling - rejected as unnecessary complexity for an internal package.

### Dependency Management: Peer Dependencies for React Native

**Decision**: Mark `react` and `react-native` as peer dependencies with loose version constraints.

**Rationale**:

- Prevents multiple React versions in the bundle
- Allows consuming apps to control React Native version
- Follows React Native library best practices

## Risks / Trade-offs

**Risk**: React Native version mismatches between package and consuming apps  
→ **Mitigation**: Use peer dependencies with broad version ranges; document supported React Native versions in README

**Risk**: react-native-reusables updates may introduce breaking changes  
→ **Mitigation**: Pin to specific version initially; document upgrade process in runbook; maintain changelog

**Risk**: Components may not work correctly across all Expo platforms (iOS, Android, Web)  
→ **Mitigation**: Test verification in `base-universal-app` covers all three platforms; document platform-specific limitations

**Risk**: Package may become a bottleneck if every component change requires package update  
→ **Mitigation**: Document clear contribution guidelines; keep components simple and composable; encourage app-level customization over package bloat

**Trade-off**: Single package vs multiple domain packages  
→ **Acceptance**: Starting with single package for simplicity; may split by domain (forms, navigation, etc.) if it grows too large

## Migration Plan

Not applicable - this is a net-new package with no migration path needed.

## Open Questions

1. Should we export the underlying react-native-reusables types directly, or re-export them through our own namespace?
2. How should we handle platform-specific component variants (e.g., iOS-style buttons vs Material Design)?
3. Should we include Storybook or similar for component development and documentation?
