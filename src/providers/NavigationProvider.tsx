import { navigationRef } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';

const NavigationProvider: FC = ({ children }) => {
  return <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>;
};

export default NavigationProvider;
