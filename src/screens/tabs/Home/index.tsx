import { AppRouteName, TabRouteName } from '@core/enums';
import { TabScreen } from '@core/types';
import { commonStyles } from '@themes';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Home: TabScreen<TabRouteName.Home> = ({ navigation }) => {
  return (
    <View style={commonStyles.flexCenter}>
      <Text>Home</Text>
      <Button
        title="Navigate to Categories"
        onPress={() => navigation.navigate(AppRouteName.Categories)}
      />
      <Button
        title="Navigate to Settings"
        onPress={() => navigation.navigate(AppRouteName.Settings)}
      />
    </View>
  );
};

export default Home;
