import { Language, Resource } from '@core/types';
import 'react-i18next';
import { DEFAULT_NAMESPACE } from '.';

declare module 'react-i18next' {
  type DefaultNS = typeof DEFAULT_NAMESPACE;
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Record<Language, Resource>;
  }
}
