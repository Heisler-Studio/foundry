## ADDED Requirements

### Requirement: Package directory structure

The package SHALL have a standardized directory structure with source code in `src/`, build output in `dist/`, and documentation in appropriate locations.

#### Scenario: Directory layout validation

- **WHEN** the package is created
- **THEN** it SHALL have `src/` directory for TypeScript source files
- **AND** it SHALL have `package.json` with proper configuration
- **AND** it SHALL have `tsconfig.json` extending `@foundry/config`

### Requirement: Package name and namespace

The package SHALL be named `@foundry/react-native-components` and be importable by workspace apps.

#### Scenario: Package naming

- **WHEN** the package is initialized
- **THEN** `package.json` name field SHALL be `@foundry/react-native-components`
- **AND** the package SHALL be referenced using this name in imports

### Requirement: TypeScript configuration

The package SHALL use TypeScript with strict settings and proper module configuration for React Native.

#### Scenario: TypeScript setup

- **WHEN** the package is built
- **THEN** `tsconfig.json` SHALL extend `@foundry/config/tsconfig.base.json`
- **AND** output SHALL be ES modules with declaration files
- **AND** JSX SHALL be configured for React Native

### Requirement: Workspace integration

The package SHALL be properly registered in the pnpm workspace and be importable by other packages.

#### Scenario: Workspace linking

- **WHEN** an app adds `@foundry/react-native-components` as a dependency
- **THEN** pnpm SHALL link it from the workspace
- **AND** imports SHALL resolve correctly

### Requirement: Build configuration

The package SHALL have a build script that compiles TypeScript to JavaScript with type declarations.

#### Scenario: Build execution

- **WHEN** `pnpm run build` is executed
- **THEN** TypeScript SHALL compile `src/` to `dist/`
- **AND** declaration files (`.d.ts`) SHALL be generated
- **AND** the build SHALL complete without errors

### Requirement: Package exports

The package SHALL export components through a main entry point that re-exports all public APIs.

#### Scenario: Entry point configuration

- **WHEN** the package exports are configured
- **THEN** `package.json` exports field SHALL point to `dist/index.js`
- **AND** `src/index.ts` SHALL re-export all component modules

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
