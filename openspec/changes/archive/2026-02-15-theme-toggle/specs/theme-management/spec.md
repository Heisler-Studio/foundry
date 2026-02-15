## ADDED Requirements

### Requirement: Theme mode selection

The system SHALL support theme modes defined by the `ThemeValue` type: 'system', 'light', and 'dark'. The type SHALL be extensible to support additional custom themes in the future.

#### Scenario: System mode detection

- **WHEN** the user selects the system theme mode
- **THEN** the app SHALL use the device's system color scheme preference

#### Scenario: Light mode selection

- **WHEN** the user selects the light theme mode
- **THEN** the app SHALL display the light theme regardless of system preference

#### Scenario: Dark mode selection

- **WHEN** the user selects the dark theme mode
- **THEN** the app SHALL display the dark theme regardless of system preference

### Requirement: Theme state management

The system SHALL use Zustand to manage theme state across the application.

#### Scenario: Store initialization

- **WHEN** the theme store is created
- **THEN** it SHALL initialize with the persisted theme mode or default to 'system'

#### Scenario: Theme mode updates

- **WHEN** the user changes the theme mode
- **THEN** the store SHALL update the mode and trigger UI re-renders

### Requirement: System preference detection

The system SHALL detect and respond to system color scheme changes in real-time when in 'system' mode.

#### Scenario: System preference changes

- **WHEN** the device system theme changes while mode is 'system'
- **THEN** the app theme SHALL update immediately to match

### Requirement: Theme persistence

The system SHALL persist the user's theme preference using MMKV.

#### Scenario: App restart with persisted theme

- **WHEN** the app restarts
- **THEN** it SHALL load the previously saved theme mode from storage
