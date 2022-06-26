import { navigationRef } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import React, { PropsWithChildren } from 'react';

const NavigationProvider = ({ children }: PropsWithChildren) => {
  return <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>;
};

export default NavigationProvider;
