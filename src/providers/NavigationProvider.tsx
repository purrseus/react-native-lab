import { useLoading } from '@hooks';
import { navigationRef } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';

const NavigationProvider: FC = ({ children }) => {
  const { toggleLoading, isLoading } = useLoading();

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={isLoading ? () => toggleLoading(false) : undefined}
    >
      {children}
    </NavigationContainer>
  );
};

export default NavigationProvider;
