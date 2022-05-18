import { colors } from '@themes';
import { compareMemo } from '@utilities';
import React from 'react';
import {
  ColorValue,
  StatusBar as RNStatusBar,
  StatusBarProps,
  StatusBarStyle,
  useColorScheme,
} from 'react-native';

const StatusBar = compareMemo<StatusBarProps>(({ ...props }) => {
  const colorScheme = useColorScheme();
  const barStyle: StatusBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  const backgroundColor: ColorValue = colors.transparent;

  return <RNStatusBar translucent {...{ barStyle, backgroundColor }} {...props} />;
});

export default StatusBar;
