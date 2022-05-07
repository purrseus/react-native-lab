import { AppScreenName, AuthScreenName } from '@core/enums';
import { RootStackParamList } from '@core/types';
import { useAppSelector, useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import styleCallback from '@navigation/styles';
import BottomTabBar from '@navigation/tabs/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories, Settings } from '@screens/app';
import { Login, Register } from '@screens/auth';
import React, { FC } from 'react';

export const NativeStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
  const styles = useStyle(styleCallback);
  const { accessToken, refreshToken } = useAppSelector(state => state.auth);
  const isAuthenticated = !!accessToken?.length && !!refreshToken?.length;

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={isAuthenticated ? AppScreenName.BottomTab : AuthScreenName.Login}
    >
      {isAuthenticated ? (
        <NativeStack.Group>
          <NativeStack.Screen name={AppScreenName.BottomTab} component={BottomTabBar} />
          <NativeStack.Screen name={AppScreenName.Categories} component={Categories} />
          <NativeStack.Screen name={AppScreenName.Settings} component={Settings} />
        </NativeStack.Group>
      ) : (
        <NativeStack.Group>
          <NativeStack.Screen name={AuthScreenName.Login} component={Login} />
          <NativeStack.Screen name={AuthScreenName.Register} component={Register} />
        </NativeStack.Group>
      )}
    </NativeStack.Navigator>
  );
};

export default RootNavigator;
