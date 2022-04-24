import { OverlayLoading, StatusBar } from '@components/core';
import { commonStyles } from '@themes';
import { isAndroid } from '@utilities';
import React, { FC } from 'react';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (isAndroid && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UIProvider: FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={commonStyles.flexFill}>
        <StatusBar />
        {children}
        <OverlayLoading />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default UIProvider;
