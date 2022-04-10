import { Resource } from '@i18n/react-i18next';
import { Normalize } from 'react-i18next';

export type Language = 'en-US' | 'ja-JP' | 'vi-VN';
export type I18nText = Normalize<Resource>;
