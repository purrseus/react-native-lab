import { TabRouteName } from '@core/enums';
import { BottomTabParamList } from '@core/types';
import { tabScreenOptions, tabScreenStyles } from '@navigators/options';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Notification, Home, Chats, Profile } from '@screens/tabs';
import React, { FC } from 'react';
import TabBar from './custom';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabBar: FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName={TabRouteName.Home}
      screenOptions={tabScreenOptions}
      sceneContainerStyle={tabScreenStyles}
      tabBar={props => <TabBar {...props} />}
    >
      <BottomTab.Screen name={TabRouteName.Home} component={Home} />
      <BottomTab.Screen name={TabRouteName.Chats} component={Chats} />
      <BottomTab.Screen name={TabRouteName.Notification} component={Notification} />
      <BottomTab.Screen name={TabRouteName.Profile} component={Profile} />
    </BottomTab.Navigator>
  );
};

export default BottomTabBar;
