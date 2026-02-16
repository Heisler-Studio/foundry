import commonEN from '@/locales/en/common.json';
import settingsEN from '@/locales/en/settings.json';
import commonES from '@/locales/es/common.json';
import settingsES from '@/locales/es/settings.json';

export type CommonTranslations = typeof commonEN;
export type SettingsTranslations = typeof settingsEN;

export interface Resources {
  common: CommonTranslations;
  settings: SettingsTranslations;
}

export type SupportedLocale = 'en' | 'es';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'es'];

export const DEFAULT_LOCALE: SupportedLocale = 'en';

export const resources = {
  en: {
    common: commonEN,
    settings: settingsEN,
  },
  es: {
    common: commonES,
    settings: settingsES,
  },
} as const;

export type ResourcesType = typeof resources;
