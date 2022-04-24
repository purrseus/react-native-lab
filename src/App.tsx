import RootNavigator from '@navigation/stacks/RootNavigator';
import NavigationProvider from '@providers/NavigationProvider';
import StoreProvider from '@providers/StoreProvider';
import UIProvider from '@providers/UIProvider';
import React, { FC } from 'react';

const App: FC = () => (
  <StoreProvider>
    <NavigationProvider>
      <UIProvider>
        <RootNavigator />
      </UIProvider>
    </NavigationProvider>
  </StoreProvider>
);

export default App;
