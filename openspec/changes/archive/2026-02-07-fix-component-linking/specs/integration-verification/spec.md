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
