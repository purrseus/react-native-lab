import { TabRouteName } from '@core/enums';
import { BottomTabParamList } from '@core/types';
import { useStyle } from '@hooks';
import { tabScreenOptions } from '@navigators/options';
import styleCallback from '@navigators/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Chats, Home, Notification, Profile } from '@screens/tabs';
import React, { FC } from 'react';
import CustomTabBar from './CustomTabBar';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabBar: FC = () => {
  const styles = useStyle(styleCallback);

  return (
    <BottomTab.Navigator
      initialRouteName={TabRouteName.Home}
      screenOptions={tabScreenOptions}
      sceneContainerStyle={styles.screenStyle}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <BottomTab.Screen name={TabRouteName.Home} component={Home} />
      <BottomTab.Screen name={TabRouteName.Chats} component={Chats} />
      <BottomTab.Screen name={TabRouteName.Notification} component={Notification} />
      <BottomTab.Screen name={TabRouteName.Profile} component={Profile} />
    </BottomTab.Navigator>
  );
};

export default BottomTabBar;
