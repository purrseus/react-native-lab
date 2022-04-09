import React, { FC } from 'react';
import RootNavigator from '@navigators/stacks/RootNavigator';
import AppProvider from '@providers/AppProvider';

const App: FC = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default App;
