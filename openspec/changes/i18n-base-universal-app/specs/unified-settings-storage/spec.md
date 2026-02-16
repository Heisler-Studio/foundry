## ADDED Requirements

### Requirement: Unified Zustand store with slice pattern

The system SHALL provide a single Zustand store containing all user preference slices.

#### Scenario: Store initialization with slices

- **WHEN** the settings store is created
- **THEN** it SHALL contain a theme slice with mode state and setters
- **AND** it SHALL contain a language slice with locale state and setters
- **AND** it SHALL be extensible for future preference domains (notifications, accessibility, etc.)

### Requirement: Theme slice in unified store

The system SHALL include theme preferences as a slice within the unified settings store.

#### Scenario: Theme mode state management

- **WHEN** accessing the theme slice
- **THEN** the system SHALL provide `state.theme.mode` for the current theme mode
- **AND** the system SHALL provide `state.theme.setMode(mode)` to update the theme
- **AND** the theme slice SHALL support 'light', 'dark', and 'system' values

#### Scenario: Theme slice selectors

- **WHEN** a component imports `useSettingsStore`
- **THEN** it SHALL access theme state via `useSettingsStore((state) => state.theme.mode)`
- **AND** it SHALL access theme actions via `useSettingsStore((state) => state.theme.setMode)`

### Requirement: Language slice in unified store

The system SHALL include language preferences as a slice within the unified settings store.

#### Scenario: Language locale state management

- **WHEN** accessing the language slice
- **THEN** the system SHALL provide `state.language.locale` for the current locale
- **AND** the system SHALL provide `state.language.setLocale(locale)` to update the locale
- **AND** the system SHALL provide `state.language.deviceDetected` to track if using device setting or user override

#### Scenario: Language initialization with device detection

- **WHEN** the app initializes with no stored language preference
- **THEN** the system SHALL detect the device locale
- **AND** set `deviceDetected` to true
- **AND** store the detected locale as the current locale

#### Scenario: User language override

- **WHEN** a user explicitly sets a language preference
- **THEN** the system SHALL store the selected locale
- **AND** set `deviceDetected` to false
- **AND** persist the user preference to MMKV

### Requirement: Single MMKV storage key

The system SHALL persist all settings to a single MMKV storage key.

#### Scenario: Settings persistence

- **WHEN** any slice state changes (theme or language)
- **THEN** the unified store SHALL persist the entire state to MMKV
- **AND** use the storage key `@foundry/user-settings`
- **AND** store state as a single JSON object with slice keys

#### Scenario: Settings rehydration

- **WHEN** the app launches
- **THEN** the unified store SHALL load settings from MMKV
- **AND** rehydrate all slices from the stored state
- **AND** handle missing or corrupted storage gracefully with defaults

### Requirement: Schema versioning and migration

The system SHALL support schema versioning for future settings migrations.

#### Scenario: Settings schema version

- **WHEN** persisting settings to MMKV
- **THEN** the system SHALL include a `version` field in the stored state
- **AND** the initial version SHALL be 1

#### Scenario: Future migration support

- **WHEN** loading settings with a different version than current
- **THEN** the system SHALL run migration logic to transform old state
- **AND** update the stored version after migration

### Requirement: Atomic settings operations

The system SHALL support atomic operations across all preference slices.

#### Scenario: Reset all settings to defaults

- **WHEN** calling the reset all settings function
- **THEN** all slices SHALL be reset to their default values simultaneously
- **AND** the theme SHALL revert to system default
- **AND** the language SHALL revert to device detection
- **AND** the changes SHALL be persisted atomically

#### Scenario: Export settings

- **WHEN** calling the export settings function
- **THEN** the system SHALL return a JSON snapshot of all slice states
- **AND** include the schema version
- **AND** produce a serializable settings object

#### Scenario: Import settings

- **WHEN** calling the import settings function with a settings snapshot
- **THEN** the system SHALL validate the snapshot structure
- **AND** update all slices atomically from the snapshot
- **AND** persist the imported settings to MMKV

### Requirement: Storage adapter integration

The system SHALL use the existing storage adapter pattern for MMKV access.

#### Scenario: MMKV storage via adapter

- **WHEN** the store persists or rehydrates
- **THEN** it SHALL use the shared storage adapter from `@/lib/storage`
- **AND** fall back to no-op storage if MMKV is unavailable (Expo Go)
