## Purpose

Provides Tailwind CSS utility-first styling capabilities for the heisler-studio-foundry React Native application via NativeWind integration.

## Requirements

### Requirement: Install and configure Tailwind CSS and NativeWind dependencies

The system SHALL install and configure the required dependencies for Tailwind CSS with NativeWind in the heisler-studio-foundry app.

#### Scenario: Dependencies installed

- **WHEN** the installation script runs
- **THEN** the following packages SHALL be installed: `tailwindcss@^3.4.0`, `nativewind@^4.0.0`, `react-native-css-interop@0.1.22`
- **AND** packages SHALL be added as dependencies in the app's package.json

#### Scenario: Version compatibility

- **WHEN** checking package versions
- **THEN** `tailwindcss` version SHALL be 3.4.x
- **AND** `nativewind` version SHALL be 4.1.x or higher
- **AND** `react-native-css-interop` version SHALL be 0.1.22

### Requirement: Configure Metro bundler for CSS support

The system SHALL configure Metro bundler to process CSS files using the NativeWind Metro plugin.

#### Scenario: Metro configuration exists

- **WHEN** checking `metro.config.js`
- **THEN** it SHALL import and use the NativeWind Metro plugin
- **AND** it SHALL be configured to process `.css` files

#### Scenario: Metro plugin integration

- **WHEN** Metro bundler starts
- **THEN** the NativeWind CSS plugin SHALL be active
- **AND** it SHALL transform CSS files into React Native compatible styles

### Requirement: Configure Babel for NativeWind

The system SHALL configure Babel to support NativeWind's CSS-in-JS transformation.

#### Scenario: Babel configuration exists

- **WHEN** checking `babel.config.js`
- **THEN** it SHALL include the NativeWind babel preset
- **AND** it SHALL NOT include conflicting jsxImportSource configuration

#### Scenario: Expo preset compatibility

- **WHEN** Babel processes the app code
- **THEN** it SHALL work with `babel-preset-expo`
- **AND** it SHALL support JSX, TypeScript, and CSS imports

### Requirement: Create global.css entry point

The system SHALL create a global.css file that serves as the entry point for Tailwind CSS processing.

#### Scenario: Global CSS file exists

- **WHEN** checking `global.css`
- **THEN** it SHALL exist and be a valid CSS file
- **AND** it SHALL include Tailwind directives (@tailwind base, components, utilities)

#### Scenario: Design tokens defined

- **WHEN** viewing `global.css` or `tailwind.config.js`
- **THEN** it SHALL define custom design tokens using CSS variables or Tailwind theme
- **AND** tokens SHALL include: colors (primary, secondary, background), spacing units, border radius

#### Scenario: Theme configuration

- **WHEN** using Tailwind utilities
- **THEN** custom design tokens SHALL be available as utility classes
- **AND** they SHALL override or extend default Tailwind values

### Requirement: Import CSS in app root

The system SHALL import the global.css file in the application's root layout.

#### Scenario: CSS imported at app root

- **WHEN** checking `app/_layout.tsx`
- **THEN** it SHALL import `../global.css` at the top of the file
- **AND** the import SHALL execute before any component renders

#### Scenario: CSS available globally

- **WHEN** any component renders
- **THEN** all Tailwind utility classes SHALL be available
- **AND** custom design tokens SHALL be active

### Requirement: Configure TypeScript types

The system SHALL configure TypeScript to recognize NativeWind className types.

#### Scenario: TypeScript configuration exists

- **WHEN** checking `tsconfig.json`
- **THEN** it SHALL include NativeWind type declarations
- **AND** it SHALL reference `nativewind/types`

#### Scenario: TypeScript types file exists

- **WHEN** checking `nativewind.d.ts`
- **THEN** it SHALL exist with type reference to nativewind

### Requirement: Create example component

The system SHALL create an example component demonstrating NativeWind usage.

#### Scenario: Example component exists

- **WHEN** checking `components/example/StyledExample.tsx`
- **THEN** it SHALL exist as a valid React component
- **AND** it SHALL use NativeWind utility classes via className prop

#### Scenario: Component demonstrates features

- **WHEN** viewing the example component
- **THEN** it SHALL demonstrate: basic styling, responsive design, custom design tokens
- **AND** it SHALL be importable and renderable

#### Scenario: Component renders correctly

- **WHEN** the example component renders
- **THEN** styles SHALL be applied correctly
- **AND** no style-related errors SHALL occur

### Requirement: Hot reloading works during development

The system SHALL support hot reloading of CSS changes during development.

#### Scenario: Metro bundler starts successfully

- **WHEN** starting the development server
- **THEN** Metro bundler SHALL bundle all modules without errors
- **AND** the web server SHALL be accessible on the configured port

#### Scenario: CSS processing works

- **WHEN** Metro processes CSS files
- **THEN** no module resolution errors SHALL occur
- **AND** react-native-css-interop SHALL be properly resolved
