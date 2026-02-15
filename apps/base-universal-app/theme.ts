// https://tweakcn.com/community
// NOTE: Keep these color values in sync with global.css CSS custom properties
// This provides a single source of truth for color values needed in TypeScript

export const colors = {
  // Raw rgba values are needed for setting things like tintColor and in components
  light: {
    background: 'rgba(232, 235, 237, 1)',
    card: 'rgba(255, 255, 255, 1)',
    primary: 'rgba(223, 96, 53, 1)',
    muted: 'rgba(249, 250, 251, 1)',
    foreground: 'rgba(51, 51, 51, 1)',
  },
  dark: {
    background: 'rgba(26, 26, 26, 1)',
    card: 'rgba(32, 32, 32, 1)',
    primary: 'rgba(223, 96, 53, 1)',
    muted: 'rgba(42, 42, 42, 1)',
    foreground: 'rgba(229, 229, 229, 1)',
  },
  system: {
    // System shows a blend/gradient representation
    backgroundLight: 'rgba(232, 235, 237, 1)',
    backgroundDark: 'rgba(26, 26, 26, 1)',
    card: 'rgba(255, 255, 255, 0.8)',
    primary: 'rgba(223, 96, 53, 1)',
    header: 'rgba(200, 200, 200, 1)',
  },
} as const;
