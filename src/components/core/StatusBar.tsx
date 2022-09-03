import { colors } from '@themes';
import React from 'react';
import { StatusBar as RNStatusBar, useColorScheme } from 'react-native';

const StatusBar = () => (
  <RNStatusBar
    translucent
    barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'}
    backgroundColor={colors.transparent}
  />
);

export default StatusBar;
