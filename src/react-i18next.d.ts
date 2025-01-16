import 'react-i18next';
import en from './locales/en.json';

// Use the default namespace (translation) and extract its keys for type safety
type TranslationKeys = typeof en;

declare module 'react-i18next' {
  interface Resources {
    translation: TranslationKeys;
  }
}
