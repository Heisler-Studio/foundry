## Context

The base-universal-app has no existing i18n infrastructure—this is entirely new infrastructure. All strings are currently hardcoded, and there's no mechanism to detect device locale or support multiple languages.

For state management, the project currently uses a standalone `theme-store.ts` that manages only theme preferences. As we add more user preferences (language, notifications, accessibility, etc.), this pattern would lead to:

- Multiple MMKV storage keys and hydration states
- Duplicated persistence boilerplate
- No unified view of user preferences
- Difficult cross-setting operations

There are no existing users with theme preferences stored, so we have a clean slate to establish a unified settings store pattern from the start.

The project uses:

- Zustand for state management with persist middleware
- MMKV (via `react-native-mmkv`) for storage with a custom adapter
- Expo SDK including expo-localization
- NativeWind for styling with dark mode support

The project uses:

- Zustand for state management with persist middleware
- MMKV (via `react-native-mmkv`) for storage with a custom adapter
- Expo SDK including expo-localization
- NativeWind for styling with dark mode support

## Goals / Non-Goals

**Goals:**

1. **Unified Settings Store**: Consolidate all user preferences into a single Zustand store using the slice pattern
2. **i18n Infrastructure**: Add i18next with expo-localization for device locale detection and translation support
3. **Language Display**: Show current language setting on SettingsScreen (read-only for this phase)
4. **Type Safety**: Provide compile-time type checking for translation keys
5. **Extensibility**: Design for easy addition of future languages and preference domains

**Non-Goals:**

1. **Full Translation Migration**: Not translating all existing strings in this change (follow-up work)
2. **Language Editing UI**: No controls to change language yet (display-only phase)
3. **RTL Support**: No right-to-left language support in this iteration
4. **Pluralization Rules**: Basic i18next pluralization only, no complex locale rules
5. **Dynamic Language Loading**: All supported languages bundled at build time

## Decisions

### 1. Unified Settings Store with Slice Pattern

**Decision**: Use Zustand's slice pattern to create a single `settings-store.ts` containing theme and language slices, replacing the standalone `theme-store.ts`.

**Rationale**:

- **Maintainability**: One store file, one storage key, one hydration state to manage
- **Atomic Operations**: Can reset all settings, export/import entire preference state atomically
- **Extensibility**: Adding new preference domains only requires new slices
- **Consistency**: Follows Zustand best practices for complex state

**Alternative Considered**: Keeping separate stores and creating a "meta-store" that aggregates them. Rejected because it adds complexity without benefits over slices.

**Implementation Approach**:

```typescript
// settings-store.ts - slice pattern
interface SettingsState {
  // Theme slice
  theme: {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
  };
  // Language slice
  language: {
    locale: string;
    deviceDetected: boolean;
    setLocale: (locale: string, deviceDetected?: boolean) => void;
  };
  // Global actions
  resetAllSettings: () => void;
  exportSettings: () => SettingsSnapshot;
  importSettings: (snapshot: SettingsSnapshot) => void;
}
```

**Migration Impact**: Components using `useThemeStore` must update to `useSettingsStore((state) => state.theme.mode)`. This is a breaking change but simplifies long-term maintenance.

### 2. i18next with react-i18next for Translations

**Decision**: Use i18next with react-i18next bindings over alternatives like FormatJS or react-intl.

**Rationale**:

- **Ecosystem**: i18next is the most mature React Native i18n solution with excellent TypeScript support
- **Resource Loading**: Built-in support for loading translation resources from files
- **Namespacing**: Native support for organizing translations by domain (common, settings, etc.)
- **Fallback Chain**: Robust locale fallback with built-in logic
- **Integration**: Works seamlessly with expo-localization for device detection

**Alternative Considered**: FormatJS (react-intl). Rejected because it requires more boilerplate for resource loading and doesn't have as straightforward a React Native integration.

**Implementation Approach**:

```typescript
// lib/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default, overridden by settings store
  fallbackLng: 'en',
  interpolation: { escapeValue: false }, // React handles escaping
});
```

### 3. Device Locale Detection Strategy

**Decision**: Use expo-localization to detect device locale on first launch, store in unified settings with `deviceDetected` flag, and sync to i18next.

**Rationale**:

- **User Experience**: Respects user's device preferences automatically
- **Transparency**: `deviceDetected` flag shows whether setting came from device or user choice
- **Override Support**: Future UI can distinguish auto-detected vs manually selected
- **Persistence**: Language choice survives app restarts via MMKV

**Implementation Flow**:

1. **App Launch** → I18nProvider initializes
2. **Check Settings Store** → Load stored language preference
3. **If No Stored Preference** → Detect via `expo-localization.getLocales()`
4. **Filter Supported Locales** → Match against `['en', 'es']`, fallback to 'en'
5. **Initialize i18next** → Set detected/loaded language
6. **Sync Store** → Update settings store with locale and `deviceDetected: true` (if auto-detected)

### 4. Translation File Organization

**Decision**: Organize translations by `locales/<locale>/<namespace>.json` with manual type generation.

**Rationale**:

- **Modularity**: Namespaces (common, settings) allow code-splitting as app grows
- **Type Safety**: Generate TypeScript types from JSON files for compile-time checking
- **Simplicity**: Static JSON files are easy for translators and version control

**Structure**:

```
locales/
├── en/
│   ├── common.json      # Shared translations
│   └── settings.json    # Settings screen translations
└── es/
    ├── common.json      # Spanish stubs
    └── settings.json    # Spanish stubs
```

**Type Generation Strategy**: Manually maintain type definitions in `lib/i18n/types.ts` based on JSON structure. For production scale, use `i18next-resources-to-backend` or a type generation script. For this scope, manual types ensure correctness without build complexity.

### 5. Storage Key Consolidation

**Decision**: Use single MMKV key `@foundry/user-settings` for all preferences.

**Rationale**:

- **Atomicity**: All preferences saved/loaded together
- **Simplicity**: Single storage adapter instance
- **Clean Slate**: No existing user data to migrate, allowing simple schema design

**Implementation Details**:

```typescript
const STORAGE_KEY = '@foundry/user-settings';
const CURRENT_VERSION = 1;

// Initial state with defaults
const initialState: SettingsState = {
  theme: { mode: 'system' },
  language: { locale: 'en', deviceDetected: false },
  version: CURRENT_VERSION,
};
```

### 6. I18nProvider Architecture

**Decision**: Create dedicated I18nProvider component following ThemeProvider pattern, separate from settings store logic.

**Rationale**:

- **Separation of Concerns**: Provider handles i18next integration, store handles persistence
- **Initialization Order**: Provider initializes after settings store rehydration
- **Future Flexibility**: Can add translation loading states, error boundaries, etc.

**Provider Responsibilities**:

1. Initialize i18next instance
2. Sync i18next language with settings store
3. Handle language change side effects
4. Provide translation context to children

### 7. Settings Screen Language Display

**Decision**: Add language display as a new Card section in SettingsScreen, following existing ThemeSwitcher pattern.

**Implementation**:

```typescript
// Read-only display in SettingsScreen
const locale = useSettingsStore((state) => state.language.locale);
const deviceDetected = useSettingsStore(
  (state) => state.language.deviceDetected,
);

// Display format:
// Language
// English (en)
// {deviceDetected && "Auto-detected"}
```

**Styling**: Use same Card/CardContent pattern, typography scale, and spacing as theme section for visual consistency.

## Risks / Trade-offs

**[Risk] Breaking Store API Change** Components using `useThemeStore` will fail until updated. ThemeProvider and ThemeSwitcher must be updated as part of this change. → **Mitigation**: The change is atomic—all store-related updates in one PR. No partial migration state.

**[Risk] Language Flash on First Launch** If settings store rehydration takes time, UI may render with default 'en' then switch to detected locale. → **Mitigation**: I18nProvider waits for store rehydration before rendering children. Adds brief loading state.

**[Risk] Bundle Size** i18next + react-i18next adds ~15KB gzipped. Translation files add additional size per locale. → **Mitigation**: Only two locales initially (en + es stub). Namespaces allow future code-splitting. Acceptable for universal app.

**[Trade-off] Static vs Dynamic Translations** All translations bundled at build time. Future dynamic loading would require architectural changes. → **Acceptable**: Current app size and locale count make static bundling efficient. Easy to migrate to dynamic later if needed.

## Migration Plan

### Phase 1: Create New Infrastructure

1. **Create unified settings store** (`store/settings-store.ts`)
   - Theme slice with same API surface
   - Language slice with device detection
   - Single MMKV storage key

2. **Create i18n core** (`lib/i18n/`)
   - i18next configuration
   - Translation resources (en, es)
   - Type definitions

3. **Create I18nProvider** (`providers/I18nProvider.tsx`)
   - Initialize i18next with settings store sync
   - Handle device detection on first launch

### Phase 2: Update Consumers

1. **Update ThemeProvider** (`providers/ThemeProvider.tsx`)
   - Change import from `useThemeStore` to `useSettingsStore`
   - Update selectors to use theme slice

2. **Update ThemeSwitcher** (`components/screens/settings/ThemeSwitcher.tsx`)
   - Change import and selectors

3. **Add language display to SettingsScreen** (`components/screens/settings/index.tsx`)
   - New Card section for language
   - Read-only display with device-detected indicator

### Phase 3: Cleanup

1. **Delete theme-store.ts**
2. **Add dependencies** (i18next, react-i18next)
3. **Update root layout** (`app/_layout.tsx`)
   - Add I18nProvider wrapper around ThemeProvider

### Rollback Strategy

If issues arise:

1. Revert imports in ThemeProvider and ThemeSwitcher
2. Restore theme-store.ts
3. Remove I18nProvider from layout
4. Revert SettingsScreen changes

No data loss concern—this is new infrastructure with no existing user data to preserve.

## Open Questions

1. **Translation Key Naming Convention**: Should we use camelCase (`settings.language.title`) or snake_case (`settings.language.title`) for translation keys? Need to align with existing codebase patterns.

2. **Type Generation Automation**: Manual type maintenance is acceptable for 2 locales and 2 namespaces. At what scale should we introduce automated type generation (e.g., `i18next-typescript`)?

3. **Language Display Names**: Should language names be translated (e.g., "Español" in English interface) or always in their native form? Current plan: native form with code in parentheses.

4. **Settings Version Migration**: Should we implement automatic migration on version mismatch, or require manual user action? Current plan: automatic migration with console logging.

5. **Error Boundaries**: Should I18nProvider include error boundary for translation failures? Current plan: No—i18next has robust fallback, add error boundaries in future if needed.
