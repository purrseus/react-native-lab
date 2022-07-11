import React, { PropsWithChildren } from 'react';
import CodePush from 'react-native-code-push';
import NavigationProvider from './NavigationProvider';
import StoreProvider from './StoreProvider';
import UIProvider from './UIProvider';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <StoreProvider>
      <NavigationProvider>
        <UIProvider>{children}</UIProvider>
      </NavigationProvider>
    </StoreProvider>
  );
};

export default __DEV__ ? AppProvider : CodePush(AppProvider);
