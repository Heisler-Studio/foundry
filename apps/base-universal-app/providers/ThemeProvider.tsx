import { useThemeStore } from '@/store/theme-store';
import { THEME_DARK, THEME_SYSTEM, type ResolvedTheme, type ThemeMode } from '@/theme/types';
import { resolveTheme } from '@/theme/utils';
import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Appearance, Platform, View } from 'react-native';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  // Calculate the effective theme based on mode and system preference
  const effectiveTheme = useMemo((): ResolvedTheme => {
    return resolveTheme(mode, colorScheme);
  }, [mode, colorScheme]);

  // Sync store mode changes with NativeWind's color scheme
  useEffect(() => {
    if (mode === THEME_SYSTEM) {
      // Let system preference control it
      setColorScheme('system');
    } else if (mode === THEME_DARK) {
      setColorScheme('dark');
    } else {
      setColorScheme('light');
    }
  }, [mode, setColorScheme]);

  // Sync with React Native's Appearance API for native UI elements
  useEffect(() => {
    if (Platform.OS !== 'web') {
      Appearance.setColorScheme(effectiveTheme);
    }
  }, [effectiveTheme]);

  const value = useMemo(
    () => ({
      theme: mode,
      resolvedTheme: effectiveTheme,
      setTheme: setMode,
    }),
    [mode, effectiveTheme, setMode],
  );

  // Wrap children in a View with the dark className when in dark mode
  // NativeWind uses this class to apply dark: variants
  // Note: Using collapsable=false to ensure the View stays in the tree for NativeWind
  return (
    <ThemeContext.Provider value={value}>
      <View className={effectiveTheme === 'dark' ? 'dark flex-1' : 'flex-1'} collapsable={false}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
