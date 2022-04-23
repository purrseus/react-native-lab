import { Divider, Image, Text } from '@components/base';
import { AppScreenName, TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { commonStyles } from '@themes';
import { logger } from '@utilities';
import React from 'react';
import { Button, View } from 'react-native';

const Home: TabScreen<TabScreenName.Home> = ({ navigation }) => {
  return (
    <View style={commonStyles.flexCenter}>
      <Image
        // cached
        // fullSize
        source={{
          uri: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg',
        }}
        expectWidth={240}
        expectHeight={200}
      />

      <Button
        title="Navigate to Categories"
        onPress={() => navigation.navigate(AppScreenName.Categories)}
      />

      <Button
        title="Navigate to Settings"
        onPress={() => navigation.navigate(AppScreenName.Settings)}
      />

      <Text text="Hello" onPress={() => logger([123, 'asd', true])} />

      <Divider />
    </View>
  );
};

export default Home;
