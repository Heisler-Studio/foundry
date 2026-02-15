import { useThemeStore } from '@/store/theme-store';
import { THEME_DARK, THEME_SYSTEM, ThemeValue } from '@/types/theme';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const useEffectiveTheme = (): ThemeValue => {
  const systemTheme = useColorScheme();
  const { mode } = useThemeStore();

  if (mode === THEME_SYSTEM) {
    return (systemTheme as ThemeValue) ?? THEME_DARK;
  }
  return mode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const effectiveTheme = useEffectiveTheme();
  const hasHydrated = useThemeStore((state) => state.mode !== undefined);

  useEffect(() => {
    if (hasHydrated) {
      setIsHydrated(true);
    }
  }, [hasHydrated]);

  useEffect(() => {
    if (isHydrated && typeof document !== 'undefined') {
      const root = document.documentElement;
      if (root) {
        if (effectiveTheme === THEME_DARK) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }
  }, [effectiveTheme, isHydrated]);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};
