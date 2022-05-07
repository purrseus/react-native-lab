import { icons } from '@assets';
import { Button, Spacer } from '@components/core';
import React from 'react';
import { View } from 'react-native';

const Messages = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* <Text>Messages</Text> */}
      <Button
        title="tab.messages"
        gradient
        leftIcon={icons.home}
        rightIcon={icons.message}
        iconSize={24}
        iconSpacing={20}
        iconProps={{ tintColor: 'white' }}
        loading
      />
      <Spacer h40 />
      <Button
        title="tab.messages"
        type="outline"
        leftIcon={icons.home}
        rightIcon={icons.message}
        iconSpacing={20}
        // iconProps={{ tintColor: 'white' }}
        // loading
      />
    </View>
  );
};

export default Messages;
