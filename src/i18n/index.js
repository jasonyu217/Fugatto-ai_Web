import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en';
import zh from './translations/zh';
import ja from './translations/ja';
import ru from './translations/ru';
import ar from './translations/ar';
import es from './translations/es';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  ja: { translation: ja },
  ru: { translation: ru },
  ar: { translation: ar },
  es: { translation: es }
};

export const supportedLanguages = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  es: 'Español',
  ru: 'Русский',
  ar: 'العربية'
};

export const initI18n = () => {
  return i18next
    .use(LanguageDetector)
    .init({
      resources,
      fallbackLng: 'en',
      detection: {
        order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag'],
        caches: ['localStorage', 'cookie'],
      }
    });
};