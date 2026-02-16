import { createStorage } from '@/lib/storage';
import { THEME_SYSTEM, type ThemeMode } from '@/theme/types';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = '@foundry/theme-settings';

// createStorage() returns MMKV storage for production apps.
// MMKV v4+ works on web and native. If MMKV is unavailable (e.g., Expo Go),
// it falls back to no-op storage - settings won't persist but app won't crash.
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
      setMode: (mode: ThemeMode) => {
        set({ mode });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => storageAdapter),
      version: 1,
      skipHydration: true,
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
