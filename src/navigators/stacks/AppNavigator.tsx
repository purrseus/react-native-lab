import { AppRouteName } from '@core/enums';
import { AppStackParamList } from '@core/types';
import { useStyle } from '@hooks';
import { stackScreenOptions } from '@navigators/options';
import styleCallback from '@navigators/styles';
import BottomTabBar from '@navigators/tabs/BottomTabBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Categories, Settings } from '@screens/stacks/app';
import React, { FC } from 'react';

const RootStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: FC = () => {
  const styles = useStyle(styleCallback);

  return (
    <RootStack.Navigator
      screenOptions={{ ...stackScreenOptions, contentStyle: styles.screenStyle }}
      initialRouteName={AppRouteName.BottomTab}
    >
      <RootStack.Screen name={AppRouteName.BottomTab} component={BottomTabBar} />
      <RootStack.Screen name={AppRouteName.Categories} component={Categories} />
      <RootStack.Screen name={AppRouteName.Settings} component={Settings} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
