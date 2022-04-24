import { AppScreenName } from '@core/enums';
import { AppStackParamList } from '@core/types';
import { useStyle } from '@hooks';
import { stackScreenOptions } from '@navigation/options';
import styleCallback from '@navigation/styles';
import BottomTabBar from '@navigation/tabs/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories, Settings } from '@screens/app';
import React, { FC } from 'react';

const NativeStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: FC = () => {
  const styles = useStyle(styleCallback);

  return (
    <NativeStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={AppScreenName.BottomTab}
    >
      <NativeStack.Screen name={AppScreenName.BottomTab} component={BottomTabBar} />
      <NativeStack.Screen name={AppScreenName.Categories} component={Categories} />
      <NativeStack.Screen name={AppScreenName.Settings} component={Settings} />
    </NativeStack.Navigator>
  );
};

export default AppNavigator;
