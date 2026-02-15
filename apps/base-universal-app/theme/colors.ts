// https://tweakcn.com/community
// Colors for components that need direct RGBA values (e.g., ThemeSwitcher previews)
// For styling, use Tailwind classes with CSS variables: bg-background, text-foreground, etc.
// Dark mode is handled by NativeWind via the `dark:` prefix and `.dark` class in global.css

// Brand/Utility colors that don't change with theme
export const BRAND_APPLE_BLACK = 'rgba(0, 0, 0, 1)';
export const BRAND_GOOGLE_BLUE = 'rgba(66, 133, 244, 1)';
export const BRAND_GOOGLE_RED = 'rgba(234, 67, 53, 1)';

// Single source of truth for all theme colors
const colorDefinitions = {
  background: { light: 'rgba(232, 235, 237, 1)', dark: 'rgba(26, 26, 26, 1)' },
  foreground: { light: 'rgba(51, 51, 51, 1)', dark: 'rgba(229, 229, 229, 1)' },
  card: { light: 'rgba(255, 255, 255, 1)', dark: 'rgba(32, 32, 32, 1)' },
  'card-foreground': {
    light: 'rgba(51, 51, 51, 1)',
    dark: 'rgba(229, 229, 229, 1)',
  },
  popover: { light: 'rgba(255, 255, 255, 1)', dark: 'rgba(32, 32, 32, 1)' },
  'popover-foreground': {
    light: 'rgba(51, 51, 51, 1)',
    dark: 'rgba(229, 229, 229, 1)',
  },
  primary: { light: 'rgba(223, 96, 53, 1)', dark: 'rgba(223, 96, 53, 1)' },
  'primary-foreground': {
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(255, 255, 255, 1)',
  },
  secondary: { light: 'rgba(47, 75, 121, 1)', dark: 'rgba(40, 65, 103, 1)' },
  'secondary-foreground': {
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(229, 229, 229, 1)',
  },
  muted: { light: 'rgba(249, 250, 251, 1)', dark: 'rgba(42, 42, 42, 1)' },
  'muted-foreground': {
    light: 'rgba(107, 114, 128, 1)',
    dark: 'rgba(128, 128, 128, 1)',
  },
  accent: { light: 'rgba(214, 228, 240, 1)', dark: 'rgba(42, 54, 86, 1)' },
  'accent-foreground': {
    light: 'rgba(30, 58, 138, 1)',
    dark: 'rgba(191, 219, 254, 1)',
  },
  destructive: { light: 'rgba(239, 68, 68, 1)', dark: 'rgba(239, 68, 68, 1)' },
  'destructive-foreground': {
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(255, 255, 255, 1)',
  },
  border: { light: 'rgba(204, 204, 204, 1)', dark: 'rgba(53, 53, 53, 1)' },
  input: { light: 'rgba(244, 245, 247, 1)', dark: 'rgba(48, 48, 48, 1)' },
  ring: { light: 'rgba(224, 93, 56, 1)', dark: 'rgba(224, 93, 56, 1)' },
  'chart-1': {
    light: 'rgba(115, 153, 191, 1)',
    dark: 'rgba(133, 166, 199, 1)',
  },
  'chart-2': { light: 'rgba(225, 111, 65, 1)', dark: 'rgba(225, 111, 65, 1)' },
  'chart-3': { light: 'rgba(213, 68, 80, 1)', dark: 'rgba(213, 68, 80, 1)' },
  'chart-4': { light: 'rgba(226, 177, 70, 1)', dark: 'rgba(226, 177, 70, 1)' },
  'chart-5': { light: 'rgba(60, 76, 118, 1)', dark: 'rgba(60, 76, 118, 1)' },
  sidebar: { light: 'rgba(221, 223, 226, 1)', dark: 'rgba(31, 31, 31, 1)' },
  'sidebar-foreground': {
    light: 'rgba(51, 51, 51, 1)',
    dark: 'rgba(229, 229, 229, 1)',
  },
  'sidebar-primary': {
    light: 'rgba(224, 93, 56, 1)',
    dark: 'rgba(224, 93, 56, 1)',
  },
  'sidebar-primary-foreground': {
    light: 'rgba(255, 255, 255, 1)',
    dark: 'rgba(255, 255, 255, 1)',
  },
  'sidebar-accent': {
    light: 'rgba(214, 228, 240, 1)',
    dark: 'rgba(42, 54, 86, 1)',
  },
  'sidebar-accent-foreground': {
    light: 'rgba(30, 58, 138, 1)',
    dark: 'rgba(191, 219, 254, 1)',
  },
  'sidebar-border': {
    light: 'rgba(229, 231, 235, 1)',
    dark: 'rgba(53, 53, 53, 1)',
  },
  'sidebar-ring': {
    light: 'rgba(224, 93, 56, 1)',
    dark: 'rgba(224, 93, 56, 1)',
  },
} as const;

// Types derived from definitions
export type ThemeColorKey = keyof typeof colorDefinitions;
export type ThemeColorPalette = Record<ThemeColorKey, string>;

// All theme color keys as an array
export const THEME_COLOR_KEYS: ThemeColorKey[] = Object.keys(colorDefinitions) as ThemeColorKey[];

// Theme colors organized by mode - built from definitions
export const themeColors = {
  light: Object.fromEntries(
    Object.entries(colorDefinitions).map(([key, values]) => [key, values.light]),
  ) as ThemeColorPalette,
  dark: Object.fromEntries(
    Object.entries(colorDefinitions).map(([key, values]) => [key, values.dark]),
  ) as ThemeColorPalette,
} as const;

// Export individual keys as an object for convenient access
// Usage: themeColor.background instead of 'background'
export const themeColor = Object.fromEntries(THEME_COLOR_KEYS.map((key) => [key, key])) as {
  [K in ThemeColorKey]: K;
};
