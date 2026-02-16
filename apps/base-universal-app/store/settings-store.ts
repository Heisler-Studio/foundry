import { createStorage } from '@/lib/storage';
import { THEME_SYSTEM, type ThemeMode } from '@/theme/types';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from 'zustand/middleware';

interface ThemeSlice {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

interface LanguageSlice {
  locale: string;
  deviceDetected: boolean;
  setLocale: (locale: string, deviceDetected?: boolean) => void;
}

interface SettingsState {
  version: number;
  theme: ThemeSlice;
  language: LanguageSlice;
  resetAllSettings: () => void;
  exportSettings: () => SettingsSnapshot;
  importSettings: (snapshot: SettingsSnapshot) => void;
}

export interface SettingsSnapshot {
  version: number;
  theme: { mode: ThemeMode };
  language: { locale: string; deviceDetected: boolean };
}

const STORAGE_KEY = '@foundry/user-settings';
const CURRENT_VERSION = 1;

const DEFAULT_LOCALE = 'en';

const storage = createStorage();

const storageAdapter: StateStorage = {
  getItem: (name) => storage.getItem(name),
  setItem: (name, value) => storage.setItem(name, value),
  removeItem: (name) => storage.removeItem(name),
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      version: CURRENT_VERSION,
      theme: {
        mode: THEME_SYSTEM,
        setMode: (mode: ThemeMode) => {
          set((state) => ({
            theme: { ...state.theme, mode },
          }));
        },
      },
      language: {
        locale: DEFAULT_LOCALE,
        deviceDetected: false,
        setLocale: (locale: string, deviceDetected = false) => {
          set((state) => ({
            language: { ...state.language, locale, deviceDetected },
          }));
        },
      },
      resetAllSettings: () => {
        set({
          version: CURRENT_VERSION,
          theme: { mode: THEME_SYSTEM, setMode: get().theme.setMode },
          language: {
            locale: DEFAULT_LOCALE,
            deviceDetected: false,
            setLocale: get().language.setLocale,
          },
        });
      },
      exportSettings: () => {
        const state = get();
        return {
          version: state.version,
          theme: { mode: state.theme.mode },
          language: {
            locale: state.language.locale,
            deviceDetected: state.language.deviceDetected,
          },
        };
      },
      importSettings: (snapshot: SettingsSnapshot) => {
        if (!snapshot || typeof snapshot !== 'object') {
          console.error('Invalid settings snapshot');
          return;
        }
        set((state) => ({
          version: snapshot.version || CURRENT_VERSION,
          theme: {
            ...state.theme,
            mode: snapshot.theme?.mode || THEME_SYSTEM,
          },
          language: {
            ...state.language,
            locale: snapshot.language?.locale || DEFAULT_LOCALE,
            deviceDetected: snapshot.language?.deviceDetected ?? false,
          },
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => storageAdapter),
      version: CURRENT_VERSION,
      skipHydration: true,
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Settings store rehydration failed:', error);
          }
        };
      },
    },
  ),
);
