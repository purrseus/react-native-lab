import { AppScreenName } from '@core/enums';
import { AppScreen } from '@core/types';
import { commonStyles } from '@themes';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Categories: AppScreen<AppScreenName.Categories> = ({ navigation }) => {
  return (
    <View style={commonStyles.flexCenter}>
      <Text>Categories</Text>
      <Button title="Go back" onPress={navigation.goBack} />
    </View>
  );
};

export default Categories;
