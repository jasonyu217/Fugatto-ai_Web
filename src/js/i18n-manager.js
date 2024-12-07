import { supportedLanguages } from '../i18n';

class I18nManager {
  constructor() {
    this.currentLang = this.getInitialLanguage();
    this.translations = new Map();
    this.observers = new Set();
  }

  getInitialLanguage() {
    const userLang = navigator.language.split('-')[0];
    return Object.keys(supportedLanguages).includes(userLang) ? userLang : 'en';
  }

  async loadTranslations(lang) {
    if (!this.translations.has(lang)) {
      const module = await import(`../i18n/translations/${lang}.js`);
      this.translations.set(lang, module.default);
    }
    return this.translations.get(lang);
  }

  async changeLanguage(lang) {
    if (!supportedLanguages[lang]) return;
    
    const translations = await this.loadTranslations(lang);
    this.currentLang = lang;
    this.notifyObservers(translations);
    localStorage.setItem('preferred-language', lang);
    
    return translations;
  }

  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  notifyObservers(translations) {
    this.observers.forEach(callback => callback(translations));
  }

  async getCurrentTranslations() {
    return this.loadTranslations(this.currentLang);
  }
}

export const i18nManager = new I18nManager();