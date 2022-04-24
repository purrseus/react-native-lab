import { Image, Spacer, Text } from '@components/core';
import { AppScreenName, TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { useLoading } from '@hooks';
import { commonStyles } from '@themes';
import { wait } from '@utilities';
import React from 'react';
import { Button, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const Home: TabScreen<TabScreenName.Home> = ({ navigation }) => {
  const { toggleLoading } = useLoading();
  const netInfo = useNetInfo();

  return (
    <View style={commonStyles.flexCenter}>
      <Text>{JSON.stringify(netInfo, null, 2)}</Text>

      <Image
        // cached
        // fullSize
        source={{
          uri: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg',
        }}
        expectWidth={100}
        // expectHeight={200}
      />

      <Button
        title="Navigate to Categories"
        onPress={() => navigation.navigate(AppScreenName.Categories)}
      />

      <Button
        title="Navigate to Settings"
        onPress={() => navigation.navigate(AppScreenName.Settings)}
      />

      <Spacer h48 />

      <Text
        onPress={() => {
          toggleLoading();
          wait(3000).then(() => navigation.navigate(AppScreenName.Settings));
        }}
      >
        Show modal and navigate to an other screen
      </Text>
    </View>
  );
};

export default Home;
