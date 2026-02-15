import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import { THEME_SYSTEM, type ThemeValue } from '@/types/theme';

interface ThemeState {
  mode: ThemeValue;
  setMode: (mode: ThemeValue) => void;
}

const STORAGE_KEY = '@foundry/theme-settings';

const storage = createMMKV({ id: 'theme-storage' });

const mmkvStorage: StateStorage = {
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name, value) => {
    storage.set(name, value);
  },
  removeItem: (name) => {
    storage.remove(name);
  },
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: THEME_SYSTEM,
      setMode: (mode: ThemeValue) => set({ mode }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => mmkvStorage),
      version: 1,
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Theme store rehydration failed:', error);
          }
        };
      },
    },
  ),
);
