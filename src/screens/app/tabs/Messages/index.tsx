import { icons } from '@assets';
import { Button, Spacer, Text } from '@components/core';
import { useAppDispatch, useFormat } from '@hooks';
import { commonActions } from '@store/slices/common';
import React from 'react';
import { View } from 'react-native';

const Messages = () => {
  const dispatch = useAppDispatch();
  const { numberFormatter } = useFormat();
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
      <Text onPress={() => dispatch(commonActions.changeLanguage('ja-JP'))}>
        {numberFormatter(1_000_000_000, '0a')}
      </Text>
    </View>
  );
};

export default Messages;
