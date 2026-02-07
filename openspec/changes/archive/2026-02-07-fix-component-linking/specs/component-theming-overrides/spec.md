## ADDED Requirements

### Requirement: Base components use semantic style tokens

Base components SHALL prefer semantic Tailwind classes (for example: `bg-surface`, `text-foreground`, `border-border`) so apps can theme by mapping tokens to values.

#### Scenario: Token-based theming

- **WHEN** an app maps semantic tokens to different values in its Tailwind theme
- **THEN** base components SHALL reflect the app's theme without changing the component package code

### Requirement: ClassName overrides are supported and applied last

Exported components SHALL accept override props (at minimum `className` for the root element) and SHALL apply overrides after default styles so apps can override styling.

#### Scenario: Root override replaces base styling

- **WHEN** an app renders a component with a root `className` override
- **THEN** the component SHALL merge the override with defaults
- **AND** conflicts SHALL resolve in favor of the app-provided override

### Requirement: Slot-level overrides for composed components

For components with multiple styled elements (slots), the component API SHALL expose override props for key slots (for example: container, text, icon) so apps can adjust presentation without forking.

#### Scenario: Slot overrides customize sub-elements

- **WHEN** an app passes slot-specific class overrides
- **THEN** the corresponding sub-elements SHALL apply those overrides
- **AND** other slots SHALL retain base styling
