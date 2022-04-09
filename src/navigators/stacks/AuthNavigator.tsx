import { AuthRouteName } from '@core/enums';
import { AuthStackParamList } from '@core/types';
import { stackScreenOptions } from '@navigators/options';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register } from '@screens/stacks/auth';
import React, { FC } from 'react';

const RootStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = () => {
  return (
    <RootStack.Navigator screenOptions={stackScreenOptions} initialRouteName={AuthRouteName.Login}>
      <RootStack.Screen name={AuthRouteName.Login} component={Login} />
      <RootStack.Screen name={AuthRouteName.Register} component={Register} />
    </RootStack.Navigator>
  );
};

export default AuthNavigator;
