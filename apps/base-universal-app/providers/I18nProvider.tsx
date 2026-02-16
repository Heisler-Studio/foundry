import i18n from '@/lib/i18n';
import { useSettingsStore } from '@/store/settings-store';
import * as Localization from 'expo-localization';
import React, { useEffect, useRef } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const locale = useSettingsStore((state) => state.language.locale);
  const deviceDetected = useSettingsStore(
    (state) => state.language.deviceDetected,
  );
  const setLocale = useSettingsStore((state) => state.language.setLocale);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    const deviceLocales = Localization.getLocales();
    const deviceLocale = deviceLocales[0]?.languageTag?.split('-')[0];

    const supportedLocales = ['en', 'es'];

    if (!deviceDetected && deviceLocale) {
      const matchedLocale = supportedLocales.includes(deviceLocale)
        ? deviceLocale
        : 'en';
      setLocale(matchedLocale, true);
    }
  }, [deviceDetected, setLocale]);

  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
};
