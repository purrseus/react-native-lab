import React, { FC } from 'react';
import NavigationProvider from './NavigationProvider';
import StoreProvider from './StoreProvider';
import UIProvider from './UIProvider';

const AppProvider: FC = ({ children }) => {
  return (
    <StoreProvider>
      <NavigationProvider>
        <UIProvider>{children}</UIProvider>
      </NavigationProvider>
    </StoreProvider>
  );
};

export default AppProvider;
