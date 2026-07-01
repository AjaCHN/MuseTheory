// app/contexts/LanguageContext.tsx v0.0.8
'use client';

import React, { createContext, useSyncExternalStore, useCallback, useContext, ReactNode } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.en;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const validLanguages = Object.keys(TRANSLATIONS) as Language[];

const safeParseLanguage = (value: string | null): Language => {
  if (!value) return 'en';
  if ((validLanguages as string[]).includes(value)) {
    return value as Language;
  }
  return 'en';
};

// SSR always returns the default language to avoid hydration mismatches.
const getServerSnapshot = (): Language => 'en';

const subscribe = (callback: () => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
  };
};

const getClientSnapshot = (): Language => {
  try {
    return safeParseLanguage(localStorage.getItem('language'));
  } catch {
    return 'en';
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // useSyncExternalStore handles SSR hydration safely: the server renders
  // with the default ('en') snapshot and the client hydrates with the same
  // value on the first pass, then re-renders with the persisted language.
  const language = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const setLanguage = useCallback((lang: Language) => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.setItem('language', lang);
        // Notify same-tab listeners since the `storage` event only fires cross-tab.
        window.dispatchEvent(new StorageEvent('storage', { key: 'language' }));
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[LanguageContext] Failed to persist language:', e);
      }
    }
  }, []);

  const translation = TRANSLATIONS[language] ?? TRANSLATIONS.en;

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translation,
    mounted,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
