import RootNavigator from '@navigation';
import AppProvider from '@providers';
import React from 'react';

const App = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default App;
