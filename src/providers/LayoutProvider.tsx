import { OverlayLoading, StatusBar } from '@components/core';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useTailwind } from '@hooks';
import { overlayLoadingRef } from '@utils';
import { PropsWithChildren } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function LayoutProvider({ children }: PropsWithChildren) {
  const { tw } = useTailwind();

  return (
    <SafeAreaProvider>
      <ActionSheetProvider>
        <GestureHandlerRootView style={tw`flex-1`}>
          <StatusBar />
          {children}
          <OverlayLoading ref={overlayLoadingRef} />
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </SafeAreaProvider>
  );
}
