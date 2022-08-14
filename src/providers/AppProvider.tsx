import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAndroid } from '@utilities';
import React, { PropsWithChildren } from 'react';
import { DevSettings, UIManager } from 'react-native';
import CodePush from 'react-native-code-push';
import LayoutProvider from './LayoutProvider';
import NavigationProvider from './NavigationProvider';
import StoreProvider from './StoreProvider';

export const onAppBootstrap = () => {
  if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);

  if (__DEV__) {
    const devSettingItems: { title: string; handler: () => void }[] = [
      {
        title: 'Clear AsyncStorage and reload',
        handler: async () => {
          await AsyncStorage.clear();
          DevSettings.reload();
        },
      },
    ];

    devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
  }
};

const AppProvider = ({ children }: PropsWithChildren) => {
  onAppBootstrap();

  return (
    <StoreProvider>
      <NavigationProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </NavigationProvider>
    </StoreProvider>
  );
};

export default __DEV__ ? AppProvider : CodePush(AppProvider);
