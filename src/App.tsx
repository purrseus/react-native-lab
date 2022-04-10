import { StyledStatusBar } from '@components/base';
import { navigationRef } from '@navigation';
import RootNavigator from '@navigation/stacks/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import store, { persistor } from '@store';
import { commonStyles } from '@themes';
import { isAndroid } from '@utilities';
import React, { FC } from 'react';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={commonStyles.flexFill}>
            <StyledStatusBar />
            <RootNavigator />
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
