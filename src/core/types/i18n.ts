import { Normalize } from 'react-i18next';
import { locales } from '@assets';

export type Language = 'en-US' | 'vi-VN';
export type Locale = 'en-gb' | 'vi';
export type Resource = typeof locales.enUS & typeof locales.viVN;
export type I18nText = Normalize<Resource>;
export type LanguageMap<Value> = Record<Language, Value>;
