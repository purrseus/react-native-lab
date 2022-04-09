import { darkTheme, lightTheme } from '@themes';
import React from 'react';
import { ColorValue, StatusBar, StatusBarStyle, useColorScheme } from 'react-native';

const StyledStatusBar = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const barStyle: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundColor: ColorValue = isDarkMode ? darkTheme.background : lightTheme.background;

  return <StatusBar {...{ barStyle, backgroundColor }} />;
};

export default StyledStatusBar;
