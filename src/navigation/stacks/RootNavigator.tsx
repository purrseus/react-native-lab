import { useAppSelector, useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import styleCallback from '@navigation/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const NativeStack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  const styles = useStyle(styleCallback);
  const { accessToken } = useAppSelector(state => state.auth);

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
    >
      {accessToken ? (
        <NativeStack.Screen name="App" component={AppNavigator} />
      ) : (
        <NativeStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </NativeStack.Navigator>
  );
};

export default RootNavigator;
