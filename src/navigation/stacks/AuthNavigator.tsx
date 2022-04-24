import { AuthScreenName } from '@core/enums';
import { AuthStackParamList } from '@core/types';
import { useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import styleCallback from '@navigation/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Register } from '@screens/auth';
import React, { FC } from 'react';

const NativeStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: FC = () => {
  const styles = useStyle(styleCallback);

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={AuthScreenName.Login}
    >
      <NativeStack.Screen name={AuthScreenName.Login} component={Login} />
      <NativeStack.Screen name={AuthScreenName.Register} component={Register} />
    </NativeStack.Navigator>
  );
};

export default AuthNavigator;
