## REMOVED Requirements

### Requirement: Standalone theme store file

**Reason**: Theme preferences consolidated into unified settings store for better maintainability and extensibility **Migration**: Update imports from `@/store/theme-store` to `@/store/settings-store` and use theme slice selectors

#### Scenario: Theme store file removed

- **WHEN** searching for `@/store/theme-store` imports
- **THEN** no imports SHALL exist in the codebase
- **AND** all theme state access SHALL use `useSettingsStore` with theme slice selectors
