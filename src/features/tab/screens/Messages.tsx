import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Text, View } from 'react-native';

const Messages: TabScreen<TabScreenName.Messages> = () => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text>Messages</Text>
    </View>
  );
};

export default Messages;
