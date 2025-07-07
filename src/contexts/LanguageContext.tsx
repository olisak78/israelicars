import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type Language = 'he' | 'en' | 'ru';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Initialize i18next
i18n.use(initReactI18next).init({
  lng: 'he', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {}, // Start with empty resources, will be loaded dynamically
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('he');
  const [isLoading, setIsLoading] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && ['he', 'en', 'ru'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
      loadLanguage(savedLanguage);
    } else {
      // Default to Hebrew
      loadLanguage('he');
    }
  }, []);

  const loadLanguage = async (lang: Language) => {
    setIsLoading(true);
    try {
      // Check if language is already loaded
      if (i18n.hasResourceBundle(lang, 'translation')) {
        await i18n.changeLanguage(lang);
        setIsLoading(false);
        return;
      }

      // Load translation file
      const response = await fetch(`/locales/${lang}/translation.json`);
      const translations = await response.json();

      // Add resources to i18n
      i18n.addResourceBundle(lang, 'translation', translations);

      // Change language
      await i18n.changeLanguage(lang);

      // Set document direction for RTL languages
      document.dir = lang === 'he' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    } catch (error) {
      console.error(`Error loading language ${lang}:`, error);
      // Fallback to English if loading fails
      if (lang !== 'en') {
        await loadLanguage('en');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    await loadLanguage(lang);
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
