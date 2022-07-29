import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Settings: ProtectedScreen<ProtectedScreenName.Settings> = ({ navigation }) => {
  return (
    <View style={globalStyles.flexCenter}>
      <Text>Settings</Text>
      <Button title="Go back" onPress={navigation.goBack} />
    </View>
  );
};

export default Settings;
