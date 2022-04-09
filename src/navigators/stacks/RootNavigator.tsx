import React, { FC } from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator: FC = () => {
  const token = Math.random() !== 0.5;
  return token ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
