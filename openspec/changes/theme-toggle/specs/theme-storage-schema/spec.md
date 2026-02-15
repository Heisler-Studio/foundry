## ADDED Requirements

### Requirement: Storage engine

The system SHALL use MMKV for synchronous, high-performance key-value storage.

#### Scenario: Storage initialization

- **WHEN** the app initializes
- **THEN** an MMKV instance SHALL be created with ID 'theme-storage'

### Requirement: Storage schema versioning

The system SHALL use a versioned storage schema to support future migrations.

#### Scenario: Initial schema creation

- **WHEN** the theme is saved for the first time
- **THEN** it SHALL be stored with schema version "1.0.0"

#### Scenario: Schema validation on load

- **WHEN** persisted data is loaded from storage
- **THEN** the system SHALL validate the schema version
- **AND** handle missing or invalid schemas gracefully

### Requirement: Theme storage structure

The system SHALL store theme data in a structured format that allows for extensibility.

#### Scenario: Theme data structure

- **WHEN** theme data is persisted
- **THEN** it SHALL include at minimum:
  - `schemaVersion`: string (e.g., "1.0.0")
  - `mode`: ThemeValue type ('system' | 'light' | 'dark')
  - `lastUpdated`: ISO timestamp

### Requirement: Storage key naming

The system SHALL use namespaced storage keys to avoid collisions.

#### Scenario: Storage key format

- **WHEN** theme data is saved to MMKV
- **THEN** it SHALL use the key "@foundry/theme-settings"

### Requirement: Migration support preparation

The system SHALL be designed to support future schema migrations.

#### Scenario: Future migration handling

- **WHEN** the schema version in storage does not match the current version
- **THEN** the system SHALL provide a migration path or reset to defaults
- **AND** log the migration for debugging purposes
