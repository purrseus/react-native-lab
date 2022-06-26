import React, { PropsWithChildren } from 'react';
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

export default AppProvider;
