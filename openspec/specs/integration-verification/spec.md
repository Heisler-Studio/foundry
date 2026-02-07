## ADDED Requirements

### Requirement: Workspace dependency installation

The package SHALL be installable as a workspace dependency in consuming apps.

#### Scenario: Dependency installation

- **WHEN** adding `@foundry/react-native-components` to an app
- **THEN** `pnpm add` SHALL succeed
- **AND** the package SHALL appear in app's node_modules
- **AND** it SHALL be symlinked from the workspace

### Requirement: Component import and rendering

Components SHALL be importable and renderable without errors in consuming apps.

#### Scenario: Import verification

- **WHEN** importing `import { Card } from '@foundry/react-native-components'`
- **THEN** the import SHALL resolve successfully
- **AND** TypeScript SHALL recognize the module
- **AND** the component SHALL render without runtime errors

### Requirement: Card component integration test

The Card component SHALL be imported and rendered in `base-universal-app` as verification.

#### Scenario: Integration testing

- **WHEN** the Card component is imported into base-universal-app
- **THEN** it SHALL display in the app UI
- **AND** it SHALL render correctly on iOS, Android, and Web platforms
- **AND** it SHALL maintain styling from the package

### Requirement: Type safety in consuming apps

Components SHALL provide full TypeScript support when used in consuming apps.

#### Scenario: Type checking

- **WHEN** using components in an app
- **THEN** TypeScript SHALL provide prop autocomplete
- **AND** type errors SHALL be caught at compile time
- **AND** component interfaces SHALL be importable for extension

### Requirement: Styling propagation

Component styling SHALL work correctly when components are used in consuming apps.

#### Scenario: Style verification

- **WHEN** components are rendered in an app
- **THEN** NativeWind classes SHALL apply correctly
- **AND** custom className overrides SHALL work
- **AND** styling SHALL be consistent across platforms
