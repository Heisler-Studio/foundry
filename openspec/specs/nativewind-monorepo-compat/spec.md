## ADDED Requirements

### Requirement: Shared monorepo Tailwind content scanning

The repo SHALL provide a shared Tailwind configuration module that includes `@foundry/react-native-components` source files in Tailwind `content` scanning for NativeWind.

#### Scenario: Components are included in Tailwind content

- **WHEN** a consuming app uses the shared Tailwind configuration module
- **THEN** Tailwind SHALL scan `@foundry/react-native-components` source files for class usage
- **AND** NativeWind classes used by exported components SHALL be included in generated styles

### Requirement: Standard NativeWind setup works for workspace components

A consuming app SHALL be able to import and render components from `@foundry/react-native-components` with correct styling using the standard NativeWind monorepo setup.

#### Scenario: Component styles apply when imported from workspace

- **WHEN** a consuming app renders an exported component that uses NativeWind `className`
- **THEN** the component SHALL render without runtime errors
- **AND** the expected base styles from `className` SHALL apply

### Requirement: No bespoke per-app configuration for the package

Consuming apps SHALL NOT require additional configuration that is specific to `@foundry/react-native-components` beyond adopting the standard monorepo NativeWind setup.

#### Scenario: App setup remains generic

- **WHEN** a new app in the monorepo installs `@foundry/react-native-components`
- **THEN** it SHALL only need the standard shared NativeWind/Tailwind setup used across apps
- **AND** it SHALL NOT require package-specific path hacks or extra transformers solely for this package
