import { Appearance } from 'react-native';
import {
  themeColors,
  type ThemeColorKey,
  type ThemeColorPalette,
} from './colors';
import {
  THEME_DARK,
  THEME_LIGHT,
  THEME_SYSTEM,
  type ResolvedTheme,
  type ThemeMode,
} from './types';

/**
 * Resolves the theme mode to either 'light' or 'dark' based on system preference when in 'system' mode
 */
export const resolveTheme = (
  mode: ThemeMode,
  systemPreference?: 'light' | 'dark' | null,
): ResolvedTheme => {
  if (mode === THEME_SYSTEM) {
    const resolved = systemPreference ?? Appearance.getColorScheme();
    return resolved === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  }
  return mode === THEME_DARK ? THEME_DARK : THEME_LIGHT;
};

/**
 * Helper for preview cards that need colors for a specific theme mode
 * System theme falls back to light colors (actual colors determined at runtime)
 */
export const getPreviewColors = (mode: ThemeMode): ThemeColorPalette => {
  if (mode === THEME_DARK) {
    return themeColors.dark;
  }
  // Both light and system show light preview (system adapts at runtime)
  return themeColors.light;
};

/**
 * Gets a specific color value from the theme palette
 * Use this for iOS tintColor props or other native components that need raw RGBA values
 */
export const getThemeColor = (
  resolvedTheme: ResolvedTheme,
  colorKey: ThemeColorKey,
): string => {
  return themeColors[resolvedTheme][colorKey];
};
