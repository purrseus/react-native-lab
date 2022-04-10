import { colors } from '@themes';
import React, { FC } from 'react';
import { ColorValue, StatusBar, StatusBarStyle, useColorScheme } from 'react-native';

const StyledStatusBar: FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const barStyle: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundColor: ColorValue = colors.transparent;

  return <StatusBar translucent {...{ barStyle, backgroundColor }} />;
};

export default StyledStatusBar;
