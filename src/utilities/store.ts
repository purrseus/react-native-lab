import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slice } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export const createPersistReducer = <
  S extends Slice,
  State extends ReturnType<S['getInitialState']>,
>(
  slice: S,
  config?: Partial<PersistConfig<State>>,
) => {
  const persistConfig: PersistConfig<State> = {
    version: 1,
    key: slice.name,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    ...config,
  };

  return persistReducer<State>(persistConfig, slice.reducer);
};
