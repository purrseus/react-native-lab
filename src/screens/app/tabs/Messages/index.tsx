import { Divider, ListView, Spacer, Touchable } from '@components/core';
import { commonStyles } from '@themes';
import { createArray } from '@utilities';
import React from 'react';
import { ListRenderItem, Text, TextInput, View } from 'react-native';

const Messages = () => {
  const renderItem: ListRenderItem<number> = ({ item }) => (
    <Touchable onPress={() => console.log('asdsdsds')}>
      <Spacer h20 />
      <Text>{item}</Text>
      <Spacer h20 />
    </Touchable>
  );

  return (
    <View style={commonStyles.flexFill}>
      <Text>Messages</Text>
      <TextInput />
      <Spacer h40 />
      <ListView
        isTabScreen
        data={createArray(30)}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
};

export default Messages;
