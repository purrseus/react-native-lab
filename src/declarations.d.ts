import { RootStackParamList } from '@core/types';
import { PropsWithChildren } from 'react';
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
