import { RootNavigator } from '@navigation';
import AppProvider from '@providers/AppProvider';
import React, { FC } from 'react';

const App: FC = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default App;
