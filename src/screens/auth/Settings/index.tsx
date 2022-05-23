import { AuthScreenName } from '@core/enums';
import { AuthScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Settings: AuthScreen<AuthScreenName.Settings> = ({ navigation }) => {
  return (
    <View style={globalStyles.flexCenter}>
      <Text>Settings</Text>
      <Button title="Go back" onPress={navigation.goBack} />
    </View>
  );
};

export default Settings;
