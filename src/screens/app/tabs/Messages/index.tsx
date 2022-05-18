import { Switch } from '@components/core';
import { useBackHandler } from '@hooks';
import { globalStyles } from '@themes';
import React, { useState } from 'react';
import { View } from 'react-native';

const Messages = () => {
  const [isActive, setIsActive] = useState(false);
  useBackHandler(BackHandler => {
    BackHandler.exitApp();
    return false;
  });

  return (
    <View style={globalStyles.flexCenter}>
      {/* <Text>Message</Text> */}
      <Switch value={isActive} onChange={setIsActive} />
    </View>
  );
};

export default Messages;
