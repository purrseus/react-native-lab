import RootNavigator from '@navigation/stacks/RootNavigator';
import AppProvider from '@providers/AppProvider';
import React, { FC } from 'react';

const App: FC = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default App;
