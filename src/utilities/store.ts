import { Slice } from '@reduxjs/toolkit';
import { storage } from '@store/integration';
import Config from 'react-native-config';
import { PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { currentTimestamp } from './common';

export const createPersistReducer = <
  S extends Slice,
  State extends ReturnType<S['getInitialState']>,
>(
  slice: S,
  config?: Partial<PersistConfig<State>>,
) => {
  const version = currentTimestamp();
  const key = `${Config.APP_NAME.replace(/\s+/g, '')}/${slice.name}`;

  const persistConfig: PersistConfig<State> = {
    version,
    key,
    storage,
    stateReconciler: autoMergeLevel2,
    ...config,
  };

  return persistReducer<State>(persistConfig, slice.reducer);
};
