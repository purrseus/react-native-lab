import { I18nObject } from '@core/interfaces';
import { Resource } from '@i18n/react-i18next';
import { Normalize } from 'react-i18next';

export type Language = 'en-US' | 'vi-VN';
export type Locale = 'en-gb' | 'vi';
export type I18nText = Normalize<Resource>;
export type I18nType = I18nText | I18nObject;
export type LanguageMap<Value> = Record<Language, Value>;
