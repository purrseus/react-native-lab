import { locales } from '@assets';
import { LANGUAGE_MAP } from '@core/constants';
import { Language, LanguageMap } from '@core/types';
import { getCurrentLanguage } from '@utilities';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import 'dayjs/locale/vi';
import i18n, { ResourceLanguage } from 'i18next';
import numeral from 'numeral';
import 'numeral/locales/en-gb';
import 'numeral/locales/vi';
import { initReactI18next } from 'react-i18next';

const { enUS, viVN } = locales;
const CURRENT_LANGUAGE = getCurrentLanguage();
const FALLBACK_LANGUAGE: Language = 'en-US';
export const DEFAULT_NAMESPACE = 'translation';

export const resources: LanguageMap<ResourceLanguage> = {
  'en-US': { [DEFAULT_NAMESPACE]: enUS },
  'vi-VN': { [DEFAULT_NAMESPACE]: viVN },
};

const changeLocale = (language: Language) => {
  const key = LANGUAGE_MAP[language];
  dayjs.locale(key);
  numeral.locale(key);
};

changeLocale(CURRENT_LANGUAGE);

i18n.use(initReactI18next).init({
  lng: CURRENT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  ns: DEFAULT_NAMESPACE,
  resources,
  compatibilityJSON: 'v3',
  interpolation: {
    skipOnVariables: false,
  },
});

i18n.on('languageChanged', changeLocale);

export default i18n;
