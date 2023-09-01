/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootStackParamList } from '@core/types';
import enUS from '@i18n/locales/en-US.json';
import viVN from '@i18n/locales/vi-VN.json';
import { PropsWithChildren } from 'react';
import 'i18next';
import { SvgProps } from 'react-native-svg';
import { DEFAULT_NAMESPACE } from './constants';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module '*.svg' {
  const content: (props: PropsWithChildren<SvgProps>) => JSX.Element;
  export default content;
}

declare module 'i18next' {
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
