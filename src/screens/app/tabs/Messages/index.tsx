import { Text } from '@components/core';
import { useBackHandler } from '@hooks';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';

const Messages = () => {
  useBackHandler(BackHandler => {
    BackHandler.exitApp();
    return false;
  });

  return (
    <View style={globalStyles.flexCenter}>
      <Text>Message</Text>
    </View>
  );
};

export default Messages;
