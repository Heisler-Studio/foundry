## ADDED Requirements

### Requirement: ThemeSwitcher component

The system SHALL provide a ThemeSwitcher component that displays selectable theme options.

#### Scenario: ThemeSwitcher renders

- **WHEN** the ThemeSwitcher component is rendered
- **THEN** it SHALL display three selectable cards for System, Light, and Dark themes

### Requirement: Theme preview cards

The system SHALL display each theme option as a visual card showing the theme's appearance.

#### Scenario: Light theme preview

- **WHEN** the Light theme card is displayed
- **THEN** it SHALL show a mock UI using light theme colors (background, card, primary, text colors)

#### Scenario: Dark theme preview

- **WHEN** the Dark theme card is displayed
- **THEN** it SHALL show a mock UI using dark theme colors (background, card, primary, text colors)

#### Scenario: System theme preview

- **WHEN** the System theme card is displayed
- **THEN** it SHALL show a mock UI that blends or indicates system-dependent theming

### Requirement: Theme selection interaction

The system SHALL allow users to select a theme by tapping on its preview card.

#### Scenario: Selecting a theme

- **WHEN** the user taps on a theme card
- **THEN** the selected theme SHALL be applied immediately
- **AND** the selected card SHALL show a visual indicator (e.g., border, checkmark)

#### Scenario: Visual feedback on selection

- **WHEN** a theme is selected
- **THEN** the ThemeSwitcher SHALL visually distinguish the active theme from inactive ones
