import { Resource } from '@i18n/react-i18next';
import { Normalize } from 'react-i18next';

export type Language = 'en-US' | 'vi-VN';
export type Locale = 'en-gb' | 'vi';
export type I18nText = Normalize<Resource>;
export type LanguageMap<Value> = Record<Language, Value>;
