import { locales } from '@assets';
import { Language } from '@core/types';
import 'react-i18next';
import { DEFAULT_NAMESPACE } from '.';

const { enUS, viVN } = locales;

export type Resource = typeof enUS & typeof viVN;
export type DefaultNS = typeof DEFAULT_NAMESPACE;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Record<Language, Resource>;
  }
}
