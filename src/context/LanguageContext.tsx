'use client';

import { createContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { getCookie } from '~/utils/cookies';

export const LanguageContext = createContext({
  language: 'en',
  setLanguage: (language: string) => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState('he');

  useEffect(() => {
    const savedLanguage = getCookie('NEXT_LOCALE');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const value = useMemo(() => ({
    language,
    setLanguage,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
