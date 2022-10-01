import { navigationRef } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import { PropsWithChildren } from 'react';

const NavigationProvider = ({ children }: PropsWithChildren) => {
  return <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>;
};

export default NavigationProvider;
