import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Categories: ProtectedScreen<ProtectedScreenName.Categories> = ({ navigation }) => {
  return (
    <View style={globalStyles.flexCenter}>
      <Text>Categories</Text>
      <Button title="Go back" onPress={navigation.goBack} />
    </View>
  );
};

export default Categories;
