## ADDED Requirements

### Requirement: Language display on SettingsScreen

The system SHALL display the current language setting on the SettingsScreen.

#### Scenario: Language section display

- **WHEN** the SettingsScreen renders
- **THEN** it SHALL display a language section in a Card component
- **AND** the section SHALL follow the existing Card/CardContent pattern used by theme settings
- **AND** it SHALL display "Language" as the section title

#### Scenario: Current language code display

- **WHEN** viewing the language section on SettingsScreen
- **THEN** it SHALL display the current language code (e.g., "en", "es")
- **AND** the code SHALL be sourced from the unified settings store language slice

#### Scenario: Readable language name display

- **WHEN** viewing the language section on SettingsScreen
- **THEN** it SHALL display a human-readable language name (e.g., "English", "Español")
- **AND** the name SHALL correspond to the current language code

#### Scenario: Device-detected indicator

- **WHEN** the current language was auto-detected from device settings
- **THEN** the language section SHALL display an indicator (e.g., "Auto-detected")
- **AND** the indicator SHALL be distinguishable from user-selected language

#### Scenario: Language display is read-only

- **WHEN** the language section displays on SettingsScreen
- **THEN** it SHALL not provide any controls to change the language
- **AND** language editing SHALL be disabled for this change scope
- **AND** a placeholder comment MAY indicate future editing capability

### Requirement: Consistent styling with theme settings

The system SHALL apply consistent styling between language and theme sections.

#### Scenario: Visual consistency

- **WHEN** the language section renders
- **THEN** it SHALL use the same typography scale as the theme section
- **AND** it SHALL use the same spacing and layout
- **AND** it SHALL respect the current theme (light/dark mode)
