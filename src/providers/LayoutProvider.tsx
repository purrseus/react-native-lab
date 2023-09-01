import { OverlayLoading, StatusBar } from '@components/core';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { globalStyles } from '@themes';
import { overlayLoadingRef } from '@utilities';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function LayoutProvider({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <GestureHandlerRootView style={globalStyles.flexFill}>
          <StatusBar />
          {children}
          <OverlayLoading ref={overlayLoadingRef} />
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}
