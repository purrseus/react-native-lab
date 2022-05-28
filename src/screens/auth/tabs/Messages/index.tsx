import { Switch } from '@components/core';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { useBackHandler } from '@hooks';
import { globalStyles } from '@themes';
import React, { useState } from 'react';
import { View } from 'react-native';

const Messages: TabScreen<TabScreenName.Messages> = () => {
  const [isActive, setIsActive] = useState(false);

  useBackHandler(BackHandler => {
    BackHandler.exitApp();
    return false;
  });

  return (
    <View style={globalStyles.flexCenter}>
      <Switch value={isActive} onChange={setIsActive} />
    </View>
  );
};

export default Messages;
