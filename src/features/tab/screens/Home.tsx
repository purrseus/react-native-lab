import { Text } from '@components/core';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';
import { useHomeContainer } from '../containers';

const Home: TabScreen<TabScreenName.Home> = props => {
  const homeContainer = useHomeContainer(props);

  return (
    <View style={globalStyles.flexFillCenter}>
      <Text onPress={homeContainer.goToShowcase}>Home</Text>
    </View>
  );
};

export default Home;
