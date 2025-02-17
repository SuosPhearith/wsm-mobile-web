import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import kh from './locales/kh.json';

// Define the resources type for type safety
const resources = {
  en: { translation: en },
  kh: { translation: kh },
} as const;

i18n
  .use(LanguageDetector) // Automatically detects the user's language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: 'kh', // Default language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
