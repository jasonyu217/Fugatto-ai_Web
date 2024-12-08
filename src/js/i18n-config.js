import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import arTranslations from '../i18n/translations/ar.js';
import enTranslations from '../i18n/translations/en.js';
import esTranslations from '../i18n/translations/es.js';
import jaTranslations from '../i18n/translations/ja.js';
import ruTranslations from '../i18n/translations/ru.js';
import zhTranslations from '../i18n/translations/zh.js';

i18next
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    resources: {
      ar: {
        translation: arTranslations
      },
      en: {
        translation: enTranslations
      },
      es: {
        translation: esTranslations
      },
      ja: {
        translation: jaTranslations
      },
      ru: {
        translation: ruTranslations
      },
      zh: {
        translation: zhTranslations
      }
    }
  });

i18next.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  console.log('Current translations:', i18next.store.data);
});

export default i18next; 