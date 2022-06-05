import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { logger } from '@utilities';
import React from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';

const Home: TabScreen<TabScreenName.Home> = () => {
  logger(Config);
  return <View />;
};

export default Home;
