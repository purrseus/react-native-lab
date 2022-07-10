import RootNavigator from '@navigation';
import AppProvider from '@providers';
import React from 'react';
import CodePush from 'react-native-code-push';

const App = () => (
  <AppProvider>
    <RootNavigator />
  </AppProvider>
);

export default __DEV__ ? App : CodePush(App);
