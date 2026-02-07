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

## ADDED Requirements

### Requirement: Verification screen renders components from the workspace package

The repo SHALL include an integration verification screen in a consuming app that imports and renders a representative set of components from `@foundry/react-native-components`.

#### Scenario: Verification screen imports from package root

- **WHEN** the verification screen is built
- **THEN** all component imports SHALL come from `@foundry/react-native-components`
- **AND** the screen SHALL render without runtime errors

### Requirement: Verification covers base styles and overrides

Integration verification SHALL include at least one example of base styling and at least one example where the app applies a `className` override to a component.

#### Scenario: Overrides apply in the consuming app

- **WHEN** the verification screen renders a component with an app-provided override
- **THEN** the override styling SHALL apply
- **AND** non-overridden components SHALL retain base styling

### Requirement: Verification is cross-platform

Integration verification SHALL be runnable on iOS, Android, and Web.

#### Scenario: Cross-platform rendering

- **WHEN** the verification app is run on iOS, Android, and Web
- **THEN** the verification screen SHALL render consistently
- **AND** NativeWind styling SHALL apply on each platform
