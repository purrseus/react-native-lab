import { colors } from '@themes';
import { comparedMemo } from '@utilities';
import React from 'react';
import {
  ColorValue,
  StatusBar as RNStatusBar,
  StatusBarProps,
  StatusBarStyle,
  useColorScheme,
} from 'react-native';

const StatusBar = comparedMemo<StatusBarProps>(({ ...props }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const barStyle: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundColor: ColorValue = colors.transparent;

  return <RNStatusBar translucent {...{ barStyle, backgroundColor }} {...props} />;
});

export default StatusBar;
