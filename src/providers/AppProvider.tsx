import { StyledStatusBar } from '@components/base';
import { commonStyles } from '@themes';
import { isAndroid } from '@utilities';
import React, { FC } from 'react';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationProvider from './NavigationProvider';

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppProvider: FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={commonStyles.flexFill}>
        <NavigationProvider>
          <StyledStatusBar />
          {children}
        </NavigationProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default AppProvider;
