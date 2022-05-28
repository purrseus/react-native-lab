import { UnAuthScreenName, AuthScreenName } from '@core/enums';
import { RootStackParamList } from '@core/types';
import { useAppSelector, useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import createStyles from '@navigation/styles';
import BottomTabBar from '@navigation/tabs/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories, Settings } from '@screens/auth';
import { Login, Register } from '@screens/un-auth';
import React, { FC } from 'react';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const UnAuthStack = (
  <NativeStack.Group>
    <NativeStack.Screen name={UnAuthScreenName.Login} component={Login} />
    <NativeStack.Screen name={UnAuthScreenName.Register} component={Register} />
  </NativeStack.Group>
);

const AuthStack = (
  <NativeStack.Group>
    <NativeStack.Screen name={AuthScreenName.BottomTab} component={BottomTabBar} />
    <NativeStack.Screen name={AuthScreenName.Categories} component={Categories} />
    <NativeStack.Screen name={AuthScreenName.Settings} component={Settings} />
  </NativeStack.Group>
);

const RootNavigator: FC = () => {
  const styles = useStyle(createStyles);
  const { accessToken, refreshToken } = useAppSelector(state => state.auth);
  const isAuthenticated = !!accessToken?.length && !!refreshToken?.length;

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={isAuthenticated ? UnAuthScreenName.Login : AuthScreenName.BottomTab}
    >
      {isAuthenticated ? AuthStack : UnAuthStack}
    </NativeStack.Navigator>
  );
};

export default RootNavigator;
