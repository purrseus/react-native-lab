import { StyledImage, StyledText } from '@components/base';
import { AppRouteName, TabRouteName } from '@core/enums';
import { TabScreen } from '@core/types';
import { commonStyles } from '@themes';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Home: TabScreen<TabRouteName.Home> = ({ navigation }) => {
  return (
    <View style={commonStyles.flexCenter}>
      {/*  style={commonStyles.flexCenter} */}
      <StyledImage
        // cached
        source={{
          uri: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg',
        }}
        expectWidth={240}
        // expectHeight={200}
      />
      <Text>Home</Text>
      <Button
        title="Navigate to Categories"
        onPress={() => navigation.navigate(AppRouteName.Categories)}
      />
      <Button
        title="Navigate to Settings"
        onPress={() => navigation.navigate(AppRouteName.Settings)}
      />
      <StyledText text="sdsd" onPress={() => null} />
    </View>
  );
};

export default Home;
