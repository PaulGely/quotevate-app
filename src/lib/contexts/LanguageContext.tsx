'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

type Language = 'en' | 'fr';
type Translations = typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
      setLanguage(savedLang);
    } else {
      // Try to get browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr') {
        setLanguage('fr');
        localStorage.setItem('language', 'fr');
      } else {
        setLanguage('en');
        localStorage.setItem('language', 'en');
      }
    }
    setIsLoading(false);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setIsLoading(true);
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    setIsLoading(false);
  };

  const t = (key: string) => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value === undefined) return key;
        value = value[k];
      }
      
      return value || key;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 