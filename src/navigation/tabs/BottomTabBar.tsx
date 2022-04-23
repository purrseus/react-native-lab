import { TabScreenName } from '@core/enums';
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
      initialRouteName={TabScreenName.Home}
      screenOptions={tabScreenOptions}
      sceneContainerStyle={styles.screenStyle}
      tabBar={props => <CustomizedTabBar {...props} />}
    >
      <BottomTab.Screen name={TabScreenName.Home} component={Home} />
      <BottomTab.Screen name={TabScreenName.Messages} component={Messages} />
      <BottomTab.Screen name={TabScreenName.Notification} component={Notification} />
      <BottomTab.Screen name={TabScreenName.Profile} component={Profile} />
    </BottomTab.Navigator>
  );
};

export default BottomTabBar;
