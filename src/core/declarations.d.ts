import { Language, Resource, RootStackParamList } from '@core/types';
import { DEFAULT_NAMESPACE } from '@i18n';
import { PropsWithChildren } from 'react';
import 'react-i18next';
import { SvgProps } from 'react-native-svg';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module '*.svg' {
  const content: (props: PropsWithChildren<SvgProps>) => JSX.Element;
  export default content;
}

declare module 'react-i18next' {
  type DefaultNS = typeof DEFAULT_NAMESPACE;
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Record<Language, Resource>;
  }
}
