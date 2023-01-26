import Config from 'react-native-config';
import { MMKV } from 'react-native-mmkv';
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin';
import { StateStorage, PersistOptions, createJSONStorage } from 'zustand/middleware';

export const MMKVStorage = new MMKV();

if (__DEV__) initializeMMKVFlipper({ default: MMKVStorage });

const persistStorage: StateStorage = {
  setItem: (name, value) => MMKVStorage.set(name, value),
  getItem: name => MMKVStorage.getString(name) || null,
  removeItem: name => MMKVStorage.delete(name),
};

const createPersistOptions = <T>(
  name: string,
  additionalOptions?: Partial<PersistOptions<T, T>>,
): PersistOptions<T, T> => ({
  version: 1,
  name: `${Config.APP_NAME}/${name}-storage`,
  storage: createJSONStorage(() => persistStorage),
  ...additionalOptions,
});

export default createPersistOptions;
