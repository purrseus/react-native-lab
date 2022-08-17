import { onAppBootstrap } from '@utilities';
import React, { PropsWithChildren } from 'react';
import CodePush from 'react-native-code-push';
import LayoutProvider from './LayoutProvider';
import NavigationProvider from './NavigationProvider';
import StoreProvider from './StoreProvider';

onAppBootstrap();

const AppProvider = ({ children }: PropsWithChildren) => (
  <StoreProvider>
    <NavigationProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </NavigationProvider>
  </StoreProvider>
);

export default __DEV__ ? AppProvider : CodePush(AppProvider);
