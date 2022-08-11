import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Text, View } from 'react-native';

const Home: TabScreen<TabScreenName.Home> = () => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
