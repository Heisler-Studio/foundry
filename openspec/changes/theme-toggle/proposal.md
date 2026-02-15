## Why

The app currently only supports a light theme and doesn't allow users to customize their visual experience. Users increasingly expect apps to respect their system preferences or provide manual theme controls. Adding a theme toggle with System/Light/Dark options and persistence will improve user experience and accessibility.

## What Changes

- **Add `react-native-mmkv`** dependency for high-performance persistent theme storage
- **Create theme store and provider** in `apps/base-universal-app`:
  - Zustand store with `persist` middleware for theme state management
  - Theme provider component for applying theme class to app
  - Versioned storage schema for future extensibility
  - TypeScript `ThemeValue` type (`'system' | 'light' | 'dark'`) - extensible for future custom themes
- **Create `ThemeSwitcher` component** in `apps/base-universal-app/components/`:
  - Graphical UI showing System, Light, and Dark as selectable cards
  - Each card shows a visual mock/skeleton using actual theme colors from CSS variables
  - Built with Tailwind classes and TouchableOpacity/Pressable for selection
- **Update `apps/base-universal-app`**:
  - Integrate theme provider in root layout
  - Add theme switcher to Settings screen (`components/screens/settings/index.tsx`)
  - Dynamic theme class application based on user preference + system setting

## Capabilities

### New Capabilities

- `theme-management`: Core theme state management with Zustand, persistence, and system preference detection
- `theme-ui-components`: ThemeSwitcher component with graphical theme previews
- `theme-storage-schema`: Versioned storage schema design for settings persistence with migration support

### Modified Capabilities

- None (no existing specs require modification)

## Impact

- **Apps**: `base-universal-app` - adds theme store, provider, and ThemeSwitcher component
- **Packages**: None
- **Dependencies**:
  - `react-native-mmkv` (new) - high-performance key-value storage
  - Uses existing `zustand` and `expo-system-ui` for theme application
- **Breaking Changes**: None - purely additive feature
