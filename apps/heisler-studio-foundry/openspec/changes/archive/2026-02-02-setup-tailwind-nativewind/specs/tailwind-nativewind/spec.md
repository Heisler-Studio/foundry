## ADDED Requirements

### Requirement: Install and configure Tailwind CSS v4 dependencies

The system SHALL install and configure the required dependencies for Tailwind CSS v4 with NativeWind in the heisler-studio-foundry app.

#### Scenario: Dependencies installed

- **WHEN** the installation script runs
- **THEN** the following packages SHALL be installed: `tailwindcss@^4.0.0`, `nativewind@^5.0.0`, `react-native-css`
- **AND** packages SHALL be added as dependencies in `apps/heisler-studio-foundry/package.json`

#### Scenario: Version compatibility

- **WHEN** checking package versions
- **THEN** `tailwindcss` version SHALL be 4.0.x or higher
- **AND** `nativewind` version SHALL be 5.0.x or higher

### Requirement: Configure Metro bundler for CSS support

The system SHALL configure Metro bundler to process CSS files using the NativeWind Metro plugin.

#### Scenario: Metro configuration exists

- **WHEN** checking `apps/heisler-studio-foundry/metro.config.js`
- **THEN** it SHALL import and use the NativeWind Metro plugin
- **AND** it SHALL be configured to process `.css` files

#### Scenario: Metro plugin integration

- **WHEN** Metro bundler starts
- **THEN** the NativeWind CSS plugin SHALL be active
- **AND** it SHALL transform CSS files into React Native compatible styles

### Requirement: Configure Babel for NativeWind

The system SHALL configure Babel to support NativeWind's CSS-in-JS transformation.

#### Scenario: Babel configuration exists

- **WHEN** checking `apps/heisler-studio-foundry/babel.config.js`
- **THEN** it SHALL include the NativeWind babel preset
- **OR** it SHALL configure the NativeWind plugin correctly

#### Scenario: Expo preset compatibility

- **WHEN** Babel processes the app code
- **THEN** it SHALL work with `babel-preset-expo`
- **AND** it SHALL support JSX, TypeScript, and CSS imports

### Requirement: Create global.css entry point

The system SHALL create a global.css file that serves as the entry point for Tailwind CSS processing.

#### Scenario: Global CSS file exists

- **WHEN** checking `apps/heisler-studio-foundry/global.css`
- **THEN** it SHALL exist and be a valid CSS file
- **AND** it SHALL include the `@import "tailwindcss"` directive

#### Scenario: Design tokens defined

- **WHEN** viewing `global.css`
- **THEN** it SHALL define custom design tokens using CSS variables
- **AND** tokens SHALL include: colors (primary, secondary, background), spacing units, border radius

#### Scenario: Theme configuration

- **WHEN** using Tailwind utilities
- **THEN** custom design tokens SHALL be available as utility classes
- **AND** they SHALL override or extend default Tailwind values

### Requirement: Import CSS in app root

The system SHALL import the global.css file in the application's root layout.

#### Scenario: CSS imported at app root

- **WHEN** checking `apps/heisler-studio-foundry/app/_layout.tsx`
- **THEN** it SHALL import `../global.css` at the top of the file
- **AND** the import SHALL execute before any component renders

#### Scenario: CSS available globally

- **WHEN** any component renders
- **THEN** all Tailwind utility classes SHALL be available
- **AND** custom design tokens SHALL be active

### Requirement: Configure TypeScript types

The system SHALL configure TypeScript to recognize NativeWind className types.

#### Scenario: TypeScript configuration exists

- **WHEN** checking `apps/heisler-studio-foundry/tsconfig.json`
- **THEN** it SHALL include NativeWind type declarations
- **AND** it SHALL reference `nativewind` types

#### Scenario: TypeScript autocomplete works

- **WHEN** developers type className attributes
- **THEN** IDE SHALL provide autocomplete for Tailwind classes
- **AND** TypeScript SHALL validate className values

### Requirement: Create example component

The system SHALL create an example component demonstrating NativeWind usage.

#### Scenario: Example component exists

- **WHEN** checking `apps/heisler-studio-foundry/components/example/StyledExample.tsx`
- **THEN** it SHALL exist as a valid React component
- **AND** it SHALL use NativeWind utility classes via className prop

#### Scenario: Component demonstrates features

- **WHEN** viewing the example component
- **THEN** it SHALL demonstrate: basic styling, responsive design, custom design tokens, dark mode support
- **AND** it SHALL be importable and renderable

#### Scenario: Component renders correctly

- **WHEN** the example component renders
- **THEN** styles SHALL be applied correctly
- **AND** no style-related errors SHALL occur

### Requirement: Hot reloading works during development

The system SHALL support hot reloading of CSS changes during development.

#### Scenario: CSS changes trigger reload

- **WHEN** modifying `global.css` during development
- **THEN** the app SHALL hot reload automatically
- **AND** new styles SHALL be applied without manual restart

#### Scenario: Fast refresh works

- **WHEN** modifying components with className changes
- **THEN** Fast Refresh SHALL preserve component state
- **AND** style changes SHALL appear immediately
