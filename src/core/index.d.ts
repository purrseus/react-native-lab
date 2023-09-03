/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  import { RootStackParamList } from '@core/types';

  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'i18next' {
  import enUS from '@i18n/locales/en-US.json';
  import viVN from '@i18n/locales/vi-VN.json';
  import 'i18next';
  import { DEFAULT_NAMESPACE } from './constants';

  type DefaultNS = typeof DEFAULT_NAMESPACE;
  type Resources = Record<DefaultNS, typeof enUS & typeof viVN>;
  interface CustomTypeOptions {
    defaultNS: DefaultNS;
    resources: Resources;
  }
}

declare module 'axios' {
  interface AxiosInstance extends Axios {
    get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
    post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  }
}
