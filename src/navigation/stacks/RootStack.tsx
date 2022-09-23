import { ProtectedScreenName, UnprotectedScreenName } from '@core/enums';
import { RootStackParamList } from '@core/types';
import { Login, Register } from '@features/authentication/screens';
import {
  BottomSheets,
  Buttons,
  Form,
  Images,
  List,
  Loader,
  Modals,
  ShowcaseList,
  Spacers,
  Texts,
} from '@features/showcase/screens';
import { useAppSelector, useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import createStyles from '@navigation/styles';
import BottomTabBar from '@navigation/tabs/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const NativeStack = createNativeStackNavigator<RootStackParamList>();

const UnprotectedScreens = (
  <NativeStack.Group>
    <NativeStack.Screen name={UnprotectedScreenName.Login} component={Login} />
    <NativeStack.Screen name={UnprotectedScreenName.Register} component={Register} />
  </NativeStack.Group>
);

const ProtectedScreens = (
  <NativeStack.Group>
    <NativeStack.Screen name={ProtectedScreenName.BottomTab} component={BottomTabBar} />
    {/* Showcase */}
    <NativeStack.Screen name={ProtectedScreenName.ShowcaseList} component={ShowcaseList} />
    <NativeStack.Screen name={ProtectedScreenName.BottomSheets} component={BottomSheets} />
    <NativeStack.Screen name={ProtectedScreenName.Buttons} component={Buttons} />
    <NativeStack.Screen name={ProtectedScreenName.Form} component={Form} />
    <NativeStack.Screen name={ProtectedScreenName.Images} component={Images} />
    <NativeStack.Screen name={ProtectedScreenName.List} component={List} />
    <NativeStack.Screen name={ProtectedScreenName.Loader} component={Loader} />
    <NativeStack.Screen name={ProtectedScreenName.Modals} component={Modals} />
    <NativeStack.Screen name={ProtectedScreenName.Spacers} component={Spacers} />
    <NativeStack.Screen name={ProtectedScreenName.Texts} component={Texts} />
  </NativeStack.Group>
);

const RootNavigator = () => {
  const styles = useStyle(createStyles);
  const { accessToken, refreshToken } = useAppSelector(state => state.auth);
  const isAuthenticated = !!accessToken?.length && !!refreshToken?.length;

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={
        isAuthenticated ? UnprotectedScreenName.Login : ProtectedScreenName.BottomTab
      }
    >
      {isAuthenticated ? ProtectedScreens : UnprotectedScreens}
    </NativeStack.Navigator>
  );
};

export default RootNavigator;
