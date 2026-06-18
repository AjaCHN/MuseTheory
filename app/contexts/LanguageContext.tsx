// app/contexts/LanguageContext.tsx v0.0.7
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let resolved: Language = 'en';
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        const saved = localStorage.getItem('language');
        resolved = safeParseLanguage(saved);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[LanguageContext] Failed to read language from localStorage:', e);
      }
    }
    setLanguageState(resolved);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        localStorage.setItem('language', lang);
      }
    } catch (e) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[LanguageContext] Failed to persist language:', e);
      }
    }
    setLanguageState(lang);
  };

  const translation = TRANSLATIONS[language] ?? TRANSLATIONS.en;

  // Serve SSR / first render with the default english content to avoid
  // hydration mismatches between server and client.
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{
          language: 'en',
          setLanguage: () => {},
          t: TRANSLATIONS.en,
          mounted: false,
        }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translation,
    mounted: true,
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
