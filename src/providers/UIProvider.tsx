import { OverlayLoading, StatusBar } from '@components/core';
import { globalStyles } from '@themes';
import { isAndroid } from '@utilities';
import React, { PropsWithChildren } from 'react';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UIProvider = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={globalStyles.flexFill}>
        <StatusBar />
        {children}
        <OverlayLoading />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default UIProvider;
