// https://tweakcn.com/community
// Colors for components that need direct RGBA values (e.g., ThemeSwitcher previews)
// For styling, use Tailwind classes with CSS variables: bg-background, text-foreground, etc.
// Dark mode is handled by NativeWind via the `dark:` prefix and `.dark` class in global.css

// Brand/Utility colors that don't change with theme
export const BRAND_APPLE_BLACK = 'rgba(0, 0, 0, 1)';
export const BRAND_GOOGLE_BLUE = 'rgba(66, 133, 244, 1)';
export const BRAND_GOOGLE_RED = 'rgba(234, 67, 53, 1)';

// Theme color keys
export const THEME_COLOR_BACKGROUND = 'background' as const;
export const THEME_COLOR_CARD = 'card' as const;
export const THEME_COLOR_PRIMARY = 'primary' as const;
export const THEME_COLOR_MUTED = 'muted' as const;
export const THEME_COLOR_FOREGROUND = 'foreground' as const;
export const THEME_COLOR_HEADER = 'header' as const;

// Only include keys that exist in both light and dark themes
export const THEME_COLOR_KEYS = [
  THEME_COLOR_BACKGROUND,
  THEME_COLOR_CARD,
  THEME_COLOR_PRIMARY,
  THEME_COLOR_MUTED,
  THEME_COLOR_FOREGROUND,
] as const;

export type ThemeColorKey = (typeof THEME_COLOR_KEYS)[number];

export const themeColors = {
  light: {
    [THEME_COLOR_BACKGROUND]: 'rgba(232, 235, 237, 1)',
    [THEME_COLOR_CARD]: 'rgba(255, 255, 255, 1)',
    [THEME_COLOR_PRIMARY]: 'rgba(223, 96, 53, 1)',
    [THEME_COLOR_MUTED]: 'rgba(249, 250, 251, 1)',
    [THEME_COLOR_FOREGROUND]: 'rgba(51, 51, 51, 1)',
  },
  dark: {
    [THEME_COLOR_BACKGROUND]: 'rgba(26, 26, 26, 1)',
    [THEME_COLOR_CARD]: 'rgba(32, 32, 32, 1)',
    [THEME_COLOR_PRIMARY]: 'rgba(223, 96, 53, 1)',
    [THEME_COLOR_MUTED]: 'rgba(42, 42, 42, 1)',
    [THEME_COLOR_FOREGROUND]: 'rgba(229, 229, 229, 1)',
  },
} as const;

export type ThemeColorPalette = {
  [K in (typeof THEME_COLOR_KEYS)[number]]: string;
};
