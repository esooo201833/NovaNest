import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

// Read saved language from localStorage, fallback to browser language, then 'en'
const savedLang = localStorage.getItem('novanest_lang');
const browserLang = navigator.language?.startsWith('ar') ? 'ar' : 'en';
const defaultLang = savedLang || browserLang;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: defaultLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Apply document direction on initial load
document.documentElement.dir = defaultLang === 'ar' ? 'rtl' : 'ltr';

export default i18n;
