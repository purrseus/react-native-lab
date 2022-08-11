import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Text, View } from 'react-native';

const Profile: TabScreen<TabScreenName.Profile> = () => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;
