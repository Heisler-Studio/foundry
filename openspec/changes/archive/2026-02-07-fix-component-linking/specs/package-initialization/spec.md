## ADDED Requirements

### Requirement: Package exports support Metro and web bundlers

`@foundry/react-native-components` SHALL expose entrypoints that can be resolved and transpiled by Metro (native) and the repo's web bundler when installed via pnpm workspace linking.

#### Scenario: Metro resolves and transpiles the package

- **WHEN** a React Native app imports from `@foundry/react-native-components`
- **THEN** Metro SHALL resolve the module without requiring app-specific aliasing
- **AND** the imported code SHALL be transpiled successfully

#### Scenario: Web bundler resolves the package

- **WHEN** a web app imports from `@foundry/react-native-components`
- **THEN** the web bundler SHALL resolve the module successfully
- **AND** TypeScript types SHALL resolve for the import

### Requirement: Public API is exported only via the package entrypoint

The package SHALL export all supported components and types via the main entrypoint and SHALL NOT require consumers to import from internal file paths.

#### Scenario: Consumers import only from package root

- **WHEN** a consumer imports components from `@foundry/react-native-components`
- **THEN** all supported components SHALL be available from the package root
- **AND** consumers SHALL NOT need deep imports into `src/` or internal folders

### Requirement: Raw installed components live in package source

Installed "raw" components SHALL be placed under the package source tree and included in the package's exported API surface.

#### Scenario: Installed components are exportable

- **WHEN** a raw component file is added under the package source tree
- **THEN** it SHALL be re-exported via the package entrypoint
- **AND** consuming apps SHALL be able to import it from the package root
