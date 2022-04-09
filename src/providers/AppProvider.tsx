import { commonStyles, Colors } from '@themes';
import { isAndroid } from '@utilities';
import React, { FC } from 'react';
import { StatusBar, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationProvider from './NavigationProvider';

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppProvider: FC = ({ children }) => {
  return (
    <SafeAreaProvider style={commonStyles.flexFill}>
      <GestureHandlerRootView style={commonStyles.flexFill}>
        <NavigationProvider>
          <StatusBar barStyle="dark-content" translucent backgroundColor={Colors.transparent} />
          {children}
        </NavigationProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default AppProvider;
