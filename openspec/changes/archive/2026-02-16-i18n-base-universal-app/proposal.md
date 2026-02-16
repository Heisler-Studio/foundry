## Why

The base-universal-app needs internationalization (i18n) support to prepare for multi-language deployment. Users expect apps to respect their device language preferences, and we need a maintainable, extensible architecture that supports future languages, date/number formatting, and regional variations without major refactoring.

## What Changes

### New Capabilities

1. **i18n Core Infrastructure**
   - Install and configure i18next with react-i18next for React Native
   - Add expo-localization for device locale detection
   - Create modular translation file structure with support for `en` (default) and `es` (stub)
   - Implement namespace-based organization (common, settings, etc.)
   - Add TypeScript type safety for translation keys via type generation

2. **Unified Settings Store**
   - Create unified Zustand store with slice pattern for all user preferences
   - Include theme slice (migrated/refactored from existing theme-store.ts)
   - Include language slice with device detection and user override tracking
   - Single MMKV storage key with schema versioning
   - Support atomic operations: reset all settings, import/export preferences

3. **i18n Provider & Initialization**
   - Create I18nProvider component following ThemeProvider pattern
   - Initialize i18next with device detection on app startup
   - Add provider to root layout alongside ThemeProvider
   - Implement language change side effects (storage, re-render)

4. **Settings UI Display**
   - Add language display section to SettingsScreen (not yet editable)
   - Display current language code and readable name
   - Follow existing Card/CardContent pattern from theme settings
   - Show device-detected vs stored preference distinction

### Dependencies

- `i18next` - Core i18n library
- `react-i18next` - React bindings for i18next
- `expo-localization` - Expo module for device locale (already available via Expo SDK)
- `i18next-resources-to-backend` - Resource loading utility

## Capabilities

### New Capabilities

- `i18n-core`: Core internationalization engine with i18next, translation resources, type safety, and initialization logic
- `unified-settings-storage`: Single Zustand store with slice pattern consolidating theme and language preferences, MMKV persistence with single storage key
- `i18n-ui`: Settings screen language display component and future language selector UI

### Modified Capabilities

- `theme-storage`: Existing theme-store.ts will be refactored into unified settings store (theme slice)

## Impact

### Affected Code

- `apps/base-universal-app/package.json` - Add dependencies
- `apps/base-universal-app/app/_layout.tsx` - Add I18nProvider wrapper
- `apps/base-universal-app/components/screens/settings/index.tsx` - Add language display

### New Files

- `apps/base-universal-app/lib/i18n/index.ts` - i18next configuration and initialization
- `apps/base-universal-app/lib/i18n/resources.ts` - Translation resources loader
- `apps/base-universal-app/lib/i18n/types.ts` - TypeScript type definitions
- `apps/base-universal-app/locales/en/common.json` - English translations
- `apps/base-universal-app/locales/en/settings.json` - English settings translations
- `apps/base-universal-app/locales/es/common.json` - Spanish stub translations
- `apps/base-universal-app/locales/es/settings.json` - Spanish stub translations
- `apps/base-universal-app/store/settings-store.ts` - Unified Zustand store (theme + language slices) with `useSettingsStore()` hook providing all slices
- `apps/base-universal-app/providers/I18nProvider.tsx` - React provider component

### Deleted Files

- `apps/base-universal-app/store/theme-store.ts` - Consolidated into unified settings-store.ts

### Updated Imports

- `apps/base-universal-app/providers/ThemeProvider.tsx` - Update import from `useThemeStore` to `useSettingsStore` with theme slice selector
- `apps/base-universal-app/components/theme/ThemeSwitcher.tsx` - Update import from `useThemeStore` to `useSettingsStore` with theme slice selector

### Architecture Decisions

1. **Unified Settings Store**: Instead of fragmented stores (theme-store, language-store, future stores), use Zustand slice pattern to consolidate all user preferences into a single store with:
   - One MMKV storage key (`@foundry/user-settings`)
   - Single hydration state
   - Atomic operations across preferences (reset all, import/export)
   - Type-safe slices for each preference domain
   - Extensible pattern for adding notifications, accessibility, etc.

2. **Modular i18n Design**: Separate concerns into core (i18next), storage (unified settings), and UI layers for maintainability

3. **Type Safety**: Generate TypeScript types from translation files to catch missing keys at compile time

4. **FormatJS Integration Ready**: Architecture supports future integration with Intl.DateTimeFormat and Intl.NumberFormat for locale-aware formatting

5. **Resource Organization**: Namespace-based (`common`, `settings`) allows code-splitting and lazy loading as app grows

6. **Device Detection First**: Uses expo-localization on startup, falls back to stored preference from unified settings, then 'en' default

7. **Extensibility**: Adding new languages only requires new locale directories and type regeneration; adding new preference domains only requires new store slices

8. **Direct Store Access**: No barrel-file index exports. Import directly from `settings-store.ts`. Store hook provides all slices via selectors.

9. **Import Updates Required**: Breaking change for theme imports - `useThemeStore` becomes `useSettingsStore` with theme slice selector

### Breaking Changes

**Store API Changes (Migration Required):**

- `useThemeStore` is replaced by `useSettingsStore`
- Components must update imports and use slice selectors:

  ```typescript
  // Before
  import { useThemeStore } from '@/store/theme-store';
  const { mode, setMode } = useThemeStore();

  // After
  import { useSettingsStore } from '@/store/settings-store';
  const mode = useSettingsStore((state) => state.theme.mode);
  const setMode = useSettingsStore((state) => state.theme.setMode);
  ```

**UI Impact:** Existing hardcoded strings continue to work; no UI changes required until follow-up translation phase.
