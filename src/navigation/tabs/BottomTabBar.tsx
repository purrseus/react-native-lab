import { TabRouteName } from '@core/enums';
import { BottomTabParamList } from '@core/types';
import { useStyle } from '@hooks';
import { tabScreenOptions } from '@navigation/options';
import styleCallback from '@navigation/styles';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Messages, Home, Notification, Profile } from '@screens/tabs';
import React, { FC } from 'react';
import CustomizedTabBar from './CustomizedTabBar';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabBar: FC = () => {
  const styles = useStyle(styleCallback);

  return (
    <BottomTab.Navigator
      initialRouteName={TabRouteName.Home}
      screenOptions={tabScreenOptions}
      sceneContainerStyle={styles.screenStyle}
      tabBar={props => <CustomizedTabBar {...props} />}
    >
      <BottomTab.Screen name={TabRouteName.Home} component={Home} />
      <BottomTab.Screen name={TabRouteName.Messages} component={Messages} />
      <BottomTab.Screen name={TabRouteName.Notification} component={Notification} />
      <BottomTab.Screen name={TabRouteName.Profile} component={Profile} />
    </BottomTab.Navigator>
  );
};

export default BottomTabBar;
