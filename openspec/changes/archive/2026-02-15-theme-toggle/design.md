## Context

The `base-universal-app` currently uses CSS custom properties in `global.css` to define light and dark theme colors. The `.dark` class switches between them. However, there's no mechanism for users to control which theme is active or persist their preference.

Existing infrastructure:

- Zustand already installed (`^5.0.11`)
- `global.css` has both light and dark theme variables
- NativeWind for styling
- React Native's `useColorScheme` hook available via `react-native`
- Expo SDK provides `expo-system-ui` for system-level UI theming

## Goals / Non-Goals

**Goals:**

- Allow users to select between System, Light, and Dark theme modes
- Persist theme preference across app restarts
- Apply theme changes immediately without app restart
- Display visual previews of each theme in the settings UI
- Support future storage schema migrations

**Non-Goals:**

- Custom color palettes or theme customization
- Per-screen theme overrides
- Animated theme transitions
- Support for high-contrast or accessibility-specific themes
- Server-side theme rendering

## Decisions

### Storage: MMKV with versioned schema

**Choice:** Use `react-native-mmkv` for high-performance key-value storage with a versioned JSON schema.

**Rationale:**

- ~30x faster than AsyncStorage, synchronous API eliminates async/await complexity
- Built-in encryption support for sensitive data (not needed for theme but good for future extensibility)
- JSI-based integration works seamlessly with React Native
- Type-safe storage with better developer experience

**Alternative considered:** AsyncStorage. Rejected because MMKV provides superior performance and cleaner synchronous API without additional complexity for this use case.

### State Management: Zustand with persist middleware

**Choice:** Zustand store with `persist` middleware using a custom MMKV storage adapter.

**Rationale:**

- Zustand is already a project dependency
- Persist middleware handles serialization/deserialization automatically
- Clean API for subscribing to theme changes across the app
- MMKV provides synchronous storage but requires a custom adapter for Zustand

**Implementation approach:**

```typescript
// types/theme.ts
export type ThemeValue = 'system' | 'light' | 'dark';
// Future custom themes can extend this type:
// export type ThemeValue = 'system' | 'light' | 'dark' | 'ocean' | 'forest';

// store/theme-store.ts
import { MMKV } from 'react-native-mmkv';
import { createJSONStorage } from 'zustand/middleware';
import { ThemeValue } from '../types/theme';

const storage = new MMKV({ id: 'theme-storage' });

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

export const useThemeStore = create(
  persist(
    (set, get) => ({
      mode: 'system' as ThemeValue,
      setMode: (mode: ThemeValue) => set({ mode }),
    }),
    {
      name: '@foundry/theme-settings',
      storage: createJSONStorage(() => mmkvStorage),
      version: 1,
    },
  ),
);
```

### Theme Resolution: System preference with override

**Choice:** Derive effective theme (light/dark) from combination of user preference and system preference.

**Rationale:**

- 'system' mode must react to device changes in real-time
- Other modes should override system preference
- Computed property approach keeps logic centralized

**Implementation:**

```typescript
import { ThemeValue } from '../types/theme';

const THEME_SYSTEM: ThemeValue = 'system';
const THEME_LIGHT: ThemeValue = 'light';
const THEME_DARK: ThemeValue = 'dark';

const useEffectiveTheme = (): ThemeValue => {
  const systemTheme = useColorScheme();
  const { mode } = useThemeStore();

  if (mode === THEME_SYSTEM) return (systemTheme as ThemeValue) ?? THEME_LIGHT;
  return mode;
};
```

### Tailwind Configuration: Enable class-based dark mode

**Choice:** Add `darkMode: 'class'` to both `apps/base-universal-app/tailwind.config.js` and `packages/react-native-components/tailwind.config.ts`.

**Rationale:**

- Required for Tailwind's `dark:` variants to work with class-based theming
- Ensures NativeWind properly handles dark mode utility classes
- Without this, `dark:bg-background` and similar classes won't function

**Implementation:**

```javascript
// tailwind.config.js / tailwind.config.ts
module.exports = {
  darkMode: 'class',
  // ... rest of config
};
```

### Theme Application: CSS class on root element

**Choice:** Apply `.dark` class to the root layout based on effective theme.

**Rationale:**

- Matches existing CSS structure where `.dark` defines dark mode variables
- Works with NativeWind's class-based styling
- Simple and performant

**Implementation location:** Root layout (`app/_layout.tsx`) wrapped in ThemeProvider.

### UI Design: Visual preview cards

**Choice:** Display three cards in settings, each showing a miniature mock UI with that theme's colors.

**Rationale:**

- More intuitive than a text-based toggle
- Users can visually compare themes before selecting
- Uses actual theme colors so it's accurate

**Card structure:**

- Header bar with sample text
- Card/box showing background color
- Accent element showing primary color
- Selected state indicated with border or ring

## Risks / Trade-offs

**[Risk] Flash of wrong theme on startup** → Mitigation: Use `expo-splash-screen` to hide UI until theme is loaded from storage. ThemeProvider should handle hydration state.

**[Risk] System preference detection latency** → Mitigation: Default to 'light' if system theme unavailable (rare edge case).

**[Trade-off] Storage size vs. extensibility** → Schema includes version field and timestamp, slightly increasing storage size but enabling future migrations.

**[Trade-off] Immediate vs. delayed apply** → Theme applies immediately on selection. This is jarring on web but acceptable for mobile. Alternative (apply on restart) rejected as poor UX.

## Migration Plan

No migration needed for initial deployment. Schema version starts at 1.

Future migrations: If schema changes, increment version and add migration logic in the store's `onRehydrateStorage` or `migrate` option.

## Open Questions

1. Should theme selection show a confirmation modal or apply immediately? (Decision: immediate for better UX)
2. Should we sync theme with system UI (status bar, navigation bar)? (Decision: yes, via `expo-system-ui` if needed)
