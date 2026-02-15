## ADDED Requirements

### Requirement: Storage engine

The system SHALL use MMKV for synchronous, high-performance key-value storage.

#### Scenario: Storage initialization

- **WHEN** the app initializes
- **THEN** an MMKV instance SHALL be created with ID 'theme-storage'

### Requirement: Storage schema versioning

The system SHALL use Zustand's built-in persist middleware versioning to support future migrations.

#### Scenario: Initial schema creation

- **WHEN** the theme is saved for the first time
- **THEN** Zustand SHALL store it with version number 1

#### Scenario: Schema validation on load

- **WHEN** persisted data is loaded from storage
- **THEN** Zustand SHALL validate the stored version against the current version
- **AND** the system SHALL handle version mismatches via `onRehydrateStorage` callback

### Requirement: Theme storage structure

The system SHALL store theme data using Zustand's persist middleware.

#### Scenario: Theme data structure

- **WHEN** theme data is persisted
- **THEN** it SHALL include:
  - `mode`: ThemeValue type ('system' | 'light' | 'dark')
  - `version`: number (managed by Zustand persist middleware)

### Requirement: Storage key naming

The system SHALL use namespaced storage keys to avoid collisions.

#### Scenario: Storage key format

- **WHEN** theme data is saved to MMKV
- **THEN** it SHALL use the key "@foundry/theme-settings"

### Requirement: Migration support preparation

The system SHALL be designed to support future schema migrations using Zustand's persist middleware.

#### Scenario: Future migration handling

- **WHEN** the stored version does not match the current version
- **THEN** the system SHALL provide a migration path via Zustand's `migrate` option
- **OR** reset to defaults and log the migration for debugging
