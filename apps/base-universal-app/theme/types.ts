export const THEME_LIGHT = 'light' as const;
export const THEME_DARK = 'dark' as const;
export const THEME_SYSTEM = 'system' as const;

export const THEME_VALUES = [THEME_LIGHT, THEME_DARK, THEME_SYSTEM] as const;

export type ThemeMode = (typeof THEME_VALUES)[number];

export type ResolvedTheme = typeof THEME_LIGHT | typeof THEME_DARK;
