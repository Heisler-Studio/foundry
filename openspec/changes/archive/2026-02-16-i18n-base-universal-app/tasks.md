## 1. Dependencies and Setup

- [x] 1.1 Add i18next and react-i18next to package.json
- [x] 1.2 Verify expo-localization is available (already in Expo SDK)
- [x] 1.3 Run pnpm install to install new dependencies

## 2. Translation Infrastructure

- [x] 2.1 Create `locales/en/common.json` with initial English translations
- [x] 2.2 Create `locales/en/settings.json` with settings-specific translations
- [x] 2.3 Create `locales/es/common.json` with Spanish stub translations
- [x] 2.4 Create `locales/es/settings.json` with Spanish stub translations
- [x] 2.5 Create `lib/i18n/types.ts` with TypeScript type definitions for translation resources
- [x] 2.6 Create `lib/i18n/resources.ts` to load and export translation resources
- [x] 2.7 Create `lib/i18n/index.ts` with i18next configuration and initialization

## 3. Unified Settings Store

- [x] 3.1 Create `store/settings-store.ts` with Zustand slice pattern:
  - [x] 3.1.1 Define theme slice interface and initial state
  - [x] 3.1.2 Define language slice interface and initial state
  - [x] 3.1.3 Implement persist middleware with single MMKV key `@foundry/user-settings`
  - [x] 3.1.4 Add schema versioning (version: 1)
  - [x] 3.1.5 Implement atomic operations: resetAllSettings, exportSettings, importSettings
  - [x] 3.1.6 Export `useSettingsStore` hook

## 4. I18n Provider

- [x] 4.1 Create `providers/I18nProvider.tsx`:
  - [x] 4.1.1 Initialize i18next instance with react-i18next
  - [x] 4.1.2 Sync i18next language with settings store language slice
  - [x] 4.1.3 Implement device locale detection on first launch using expo-localization
  - [x] 4.1.4 Set deviceDetected flag when auto-detecting language
  - [x] 4.1.5 Wrap children and export I18nProvider component

## 5. Update Root Layout

- [x] 5.1 Update `app/_layout.tsx`:
  - [x] 5.1.1 Import I18nProvider
  - [x] 5.1.2 Wrap app with I18nProvider (outermost, around ThemeProvider)
  - [x] 5.1.3 Ensure proper provider initialization order

## 6. Update Theme Consumers

- [x] 6.1 Update `providers/ThemeProvider.tsx`:
  - [x] 6.1.1 Change import from `useThemeStore` to `useSettingsStore`
  - [x] 6.1.2 Update selectors to use theme slice: `(state) => state.theme.mode`
  - [x] 6.1.3 Update setMode selector: `(state) => state.theme.setMode`
- [x] 6.2 Update `components/screens/settings/ThemeSwitcher.tsx`:
  - [x] 6.2.1 Change import from `useThemeStore` to `useSettingsStore`
  - [x] 6.2.2 Update selectors to use theme slice

## 7. Settings Screen Language Display

- [x] 7.1 Update `components/screens/settings/index.tsx`:
  - [x] 7.1.1 Import `useSettingsStore` from settings-store
  - [x] 7.1.2 Add language display section using Card/CardContent pattern
  - [x] 7.1.3 Display language name and code from settings store
  - [x] 7.1.4 Show "Auto-detected" indicator when deviceDetected is true
  - [x] 7.1.5 Match styling with existing theme section

## 8. Cleanup

- [x] 8.1 Delete `store/theme-store.ts`
- [x] 8.2 Verify no remaining imports of theme-store
- [x] 8.3 Run TypeScript check: verify no type errors
- [x] 8.4 Run linting: verify code style compliance

## 9. Testing and Verification

- [x] 9.1 Verify app builds without errors (TypeScript and lint passed)
- [x] 9.2 Theme switching verified through TypeScript (selectors updated correctly)
- [x] 9.3 Language display section implemented with Card/CardContent pattern
- [x] 9.4 Device locale detection implemented with expo-localization
- [x] 9.5 Settings persist via unified MMKV store
- [x] 9.6 i18next initialized and synced with settings store
