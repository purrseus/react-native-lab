import { I18nText } from '@core/types';
import { TOptions } from 'i18next';

export interface I18nObject {
  key: I18nText;
  options?: TOptions;
}
