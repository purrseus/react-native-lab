import React, { FC } from 'react';
import { LogBox } from 'react-native';
import NavigationProvider from './NavigationProvider';
import StoreProvider from './StoreProvider';
import UIProvider from './UIProvider';

LogBox.ignoreLogs([
  'Require cycle: src/services/index.ts -> src/store/index.ts -> src/store/slices/index.ts -> src/store/slices/auth.ts -> src/services/index.ts',
  'Require cycle: src/i18n/index.ts -> src/utilities/index.ts -> src/utilities/permission.ts -> src/components/core/Alert.ts -> src/i18n/index.ts',
]);

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
