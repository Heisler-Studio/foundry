import { createStorage } from '@/lib/storage';
import { THEME_SYSTEM, type ThemeValue } from '@/types/theme';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

interface ThemeState {
  mode: ThemeValue;
  setMode: (mode: ThemeValue) => void;
}

const STORAGE_KEY = '@foundry/theme-settings';

// createStorage() detects the runtime environment and returns the appropriate
// storage implementation. In Expo Go, it uses in-memory storage since
// react-native-mmkv requires native modules not available in Expo Go.
// In development builds, it uses MMKV for persistent storage.
const storage = createStorage();

const storageAdapter: StateStorage = {
  getItem: (name) => storage.getItem(name),
  setItem: (name, value) => storage.setItem(name, value),
  removeItem: (name) => storage.removeItem(name),
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: THEME_SYSTEM,
      setMode: (mode: ThemeValue) => set({ mode }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => storageAdapter),
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
