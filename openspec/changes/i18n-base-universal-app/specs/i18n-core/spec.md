## ADDED Requirements

### Requirement: i18next configuration and initialization

The system SHALL provide a configured i18next instance ready for use in the application.

#### Scenario: i18next initialization on app startup

- **WHEN** the application initializes
- **THEN** i18next SHALL be configured with react-i18next bindings
- **AND** i18next SHALL load translation resources from the locales directory
- **AND** i18next SHALL use the language preference from the unified settings store

### Requirement: Translation file structure

The system SHALL support modular translation files organized by locale and namespace.

#### Scenario: Translation resource loading

- **WHEN** i18next initializes
- **THEN** it SHALL load translation files from `locales/<locale>/<namespace>.json`
- **AND** the default locale `en` SHALL be pre-loaded
- **AND** the stub locale `es` SHALL be available for future completion

#### Scenario: Namespace-based organization

- **WHEN** a component requests a translation key with namespace prefix (e.g., `settings:title`)
- **THEN** i18next SHALL resolve the key from the corresponding namespace file
- **AND** missing keys SHALL fall back to the default locale

### Requirement: TypeScript type safety for translations

The system SHALL provide TypeScript types generated from translation files.

#### Scenario: Compile-time type checking

- **WHEN** a developer uses the `t()` function with a translation key
- **THEN** TypeScript SHALL validate the key exists in the translation resources
- **AND** autocompletion SHALL suggest available keys

### Requirement: Device locale detection

The system SHALL detect the user's device locale using expo-localization.

#### Scenario: Device locale detection on first launch

- **WHEN** the app launches for the first time with no stored language preference
- **THEN** the system SHALL detect the device locale via expo-localization
- **AND** use the detected locale if supported (en or es)
- **AND** fall back to `en` if the detected locale is not supported

### Requirement: Language fallback chain

The system SHALL implement a language fallback chain for missing translations.

#### Scenario: Translation key missing in current locale

- **WHEN** a translation key is not found in the current locale
- **THEN** i18next SHALL attempt to find it in the current locale's parent language
- **AND** if still missing, fall back to the default locale `en`
- **AND** if still missing, return the key name as the translation

### Requirement: Translation resource format

The system SHALL support nested JSON objects for translation keys with dot notation.

#### Scenario: Nested translation key lookup

- **WHEN** a translation key uses dot notation (e.g., `settings.language.title`)
- **THEN** i18next SHALL traverse the nested JSON structure
- **AND** return the corresponding value from the translation file

### Requirement: Date and number formatting support

The system SHALL support locale-aware formatting through i18next format functions.

#### Scenario: Formatting with locale context

- **WHEN** formatting a date or number in a component
- **THEN** the system SHALL use the current i18next language setting
- **AND** apply appropriate locale formatting rules via Intl APIs
