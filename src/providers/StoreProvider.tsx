import { ActivityIndicator } from '@components/core';
import store, { persistor } from '@store';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const StoreProvider: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;
