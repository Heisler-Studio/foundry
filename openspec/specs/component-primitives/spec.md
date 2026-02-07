## ADDED Requirements

### Requirement: Card component

The package SHALL provide a Card component that wraps content in a styled container with optional header, footer, and content sections.

#### Scenario: Basic card rendering

- **WHEN** a Card component is rendered with content
- **THEN** it SHALL display the content within a styled container
- **AND** it SHALL apply default styling via NativeWind classes

#### Scenario: Card with header and footer

- **WHEN** a Card is rendered with header and footer props
- **THEN** it SHALL display the header at the top
- **AND** it SHALL display the footer at the bottom
- **AND** it SHALL maintain proper spacing between sections

#### Scenario: Card customization

- **WHEN** a Card receives className prop
- **THEN** it SHALL merge custom classes with default styling
- **AND** it SHALL allow full style overrides

### Requirement: Button component

The package SHALL provide a Button component with variants (primary, secondary, outline) and states (default, pressed, disabled).

#### Scenario: Button variants

- **WHEN** a Button is rendered with variant="primary"
- **THEN** it SHALL apply primary styling (solid background, white text)
- **AND** when variant="outline", it SHALL have transparent background with border

#### Scenario: Button states

- **WHEN** a Button is pressed
- **THEN** it SHALL visually indicate pressed state
- **AND** when disabled prop is true
- **THEN** it SHALL apply disabled styling and ignore press events

#### Scenario: Button accessibility

- **WHEN** a Button is rendered
- **THEN** it SHALL have role="button"
- **AND** it SHALL support accessibilityLabel prop
- **AND** disabled state SHALL be announced to screen readers

### Requirement: Input component

The package SHALL provide an Input component for text entry with support for various input types and states.

#### Scenario: Basic input rendering

- **WHEN** an Input is rendered
- **THEN** it SHALL accept text input
- **AND** it SHALL display placeholder text when empty
- **AND** it SHALL support value and onChangeText props

#### Scenario: Input states

- **WHEN** an Input receives focus
- **THEN** it SHALL display focused styling
- **AND** when an error prop is provided
- **THEN** it SHALL display error styling (red border)
- **AND** when disabled
- **THEN** it SHALL prevent text entry and show disabled styling

#### Scenario: Input types

- **WHEN** an Input receives keyboardType="email-address"
- **THEN** it SHALL show email-optimized keyboard
- **AND** when secureTextEntry is true
- **THEN** it SHALL mask input characters

### Requirement: Component TypeScript types

All components SHALL have proper TypeScript interfaces with documented props.

#### Scenario: Type definitions

- **WHEN** components are imported
- **THEN** TypeScript SHALL provide autocomplete for all props
- **AND** invalid prop types SHALL produce compile-time errors
- **AND** component prop interfaces SHALL be exported for extension

### Requirement: react-native-reusables integration

Components SHALL be based on react-native-reusables patterns while allowing customization.

#### Scenario: Reusables dependency

- **WHEN** components are implemented
- **THEN** they SHALL use react-native-reusables as foundation
- **AND** they SHALL wrap or extend reusables components
- **AND** default props SHALL be set for Foundry conventions

## ADDED Requirements

### Requirement: All exported primitives accept className overrides

All exported primitive components SHALL accept a `className` prop and SHALL merge it with default styles.

#### Scenario: Primitive merges className

- **WHEN** a primitive component is rendered with `className`
- **THEN** it SHALL merge the provided classes with its defaults
- **AND** conflicts SHALL resolve in favor of the provided classes

### Requirement: Primitives use semantic tokens for themeable styles

Primitives SHALL use semantic Tailwind tokens for themeable values (colors, borders) rather than hard-coded palette choices.

#### Scenario: App changes token values

- **WHEN** an app changes the semantic token mappings in its Tailwind theme
- **THEN** primitive components SHALL reflect the new theme
- **AND** the component package code SHALL remain unchanged

### Requirement: Primitives expose stable prop types

Primitive component prop types SHALL be exported so consuming apps can type wrappers and overrides.

#### Scenario: Apps import prop types

- **WHEN** an app imports a primitive component's prop type from the package
- **THEN** TypeScript SHALL provide autocomplete and type checking
- **AND** the app SHALL be able to define a wrapper component without using `any`
