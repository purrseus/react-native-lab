import { Text } from '@components/core';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';
import { useProfile } from '../hooks';

const Profile: TabScreen<TabScreenName.Profile> = () => {
  const profileContainer = useProfile();

  return (
    <View style={globalStyles.flexFillCenter}>
      <Text onPress={profileContainer.logout}>Profile</Text>
    </View>
  );
};

export default Profile;
