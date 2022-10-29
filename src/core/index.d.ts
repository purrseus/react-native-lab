/* eslint-disable @typescript-eslint/no-explicit-any */
import { Language, Resource, RootStackParamList } from '@core/types';
import { PropsWithChildren } from 'react';
import 'react-i18next';
import { SvgProps } from 'react-native-svg';
import { DEFAULT_NAMESPACE } from './constants';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module 'react-native' {
  export namespace StyleSheet {
    type MixinStyles<T> = {
      [P in keyof T]:
        | ViewStyle
        | TextStyle
        | ImageStyle
        | ((...args: any[]) => ViewStyle | TextStyle | ImageStyle);
    };
    export function create<T extends MixinStyles<T> | MixinStyles<any>>(
      styles: T | MixinStyles<T>,
    ): T;
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

declare module 'axios' {
  interface AxiosInstance extends Axios {
    get<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
    post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
    delete<T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  }
}
