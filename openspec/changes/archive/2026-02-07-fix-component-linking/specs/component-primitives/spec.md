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
