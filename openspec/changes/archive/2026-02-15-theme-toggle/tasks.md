## 1. Dependencies & Configuration

- [x] 1.1 Install `react-native-mmkv` using `pnpx expo install react-native-mmkv` in `apps/base-universal-app`
- [x] 1.2 Verify correct version is installed and compatible with Expo SDK
- [x] 1.3 Add `darkMode: 'class'` to `apps/base-universal-app/tailwind.config.js`
- [x] 1.4 Add `darkMode: 'class'` to `packages/react-native-components/tailwind.config.ts`

## 2. Theme Store

- [x] 2.1 Create `apps/base-universal-app/types/theme.ts` with `ThemeValue` type
- [x] 2.2 Define theme constants (`THEME_SYSTEM`, `THEME_LIGHT`, `THEME_DARK`) to avoid magic strings
- [x] 2.3 Create `apps/base-universal-app/store/theme-store.ts` with Zustand store
- [x] 2.4 Configure persist middleware with MMKV custom storage adapter and versioned schema
- [x] 2.5 Export `useThemeStore` hook

## 3. Theme Provider

- [x] 3.1 Create `apps/base-universal-app/components/providers/ThemeProvider.tsx`
- [x] 3.2 Read system color scheme using `useColorScheme`
- [x] 3.3 Compute effective theme (respect user preference or system)
- [x] 3.4 Apply `.dark` class to root element when effective theme is dark
- [x] 3.5 Handle hydration state to prevent flash of wrong theme

## 4. ThemeSwitcher Component

- [x] 4.1 Create `apps/base-universal-app/components/theme/ThemeSwitcher.tsx`
- [x] 4.2 Create `ThemePreviewCard` sub-component for each theme option
- [x] 4.3 Build System preview card with visual mock showing blended theme indication
- [x] 4.4 Build Light preview card with light theme colors (bg-card, primary, text)
- [x] 4.5 Build Dark preview card with dark theme colors (bg-card, primary, text)
- [x] 4.6 Add selection state with visual indicator (border/ring on selected)
- [x] 4.7 Connect to theme store - update mode on card press

## 5. Integration

- [x] 5.1 Wrap root layout in `app/_layout.tsx` with ThemeProvider
- [x] 5.2 Update Settings screen to import and render ThemeSwitcher
- [x] 5.3 Replace placeholder text "Placeholder for theme switcher" with actual component
- [x] 5.4 Test theme persistence across app restarts

## 6. Testing & Verification

- [x] 6.1 Verify theme switches between System/Light/Dark modes
- [x] 6.2 Verify System mode follows device preference changes
- [x] 6.3 Verify preference persists after app restart
- [x] 6.4 Test on iOS simulator
- [x] 6.5 Test on Android emulator
- [x] 6.6 Verify no visual glitches during theme change
