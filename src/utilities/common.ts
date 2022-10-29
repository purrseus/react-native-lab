/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { Language } from '@core/types';
import { MMKVStorage } from '@store/integration';
import { DevSettings, UIManager } from 'react-native';
import { getLocales } from 'react-native-localize';
import { isAndroid } from './os';

export const wait = (timeout = ONE_SECOND) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout));

export const createArray = (length = 0) => Array.from({ length }, (_, i) => i);

export const getCurrentLanguage = (): Language => {
  const [{ languageCode }] = getLocales();

  switch (languageCode) {
    case 'en':
      return 'en-US';
    case 'vi':
      return 'vi-VN';
    default:
      return 'en-US';
  }
};

export const deepAccessObject = <T extends Record<string, any>, V>(
  target: T,
  keyArray: string[],
): T | V => {
  if (!keyArray.length) return target;
  return keyArray.reduce((object, key) => {
    if (!!object && typeof object === 'object' && key in object) return object[key];
    return object;
  }, target);
};

export const onAppBootstrap = () => {
  if (isAndroid() && UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);

  if (__DEV__) {
    const devSettingItems: { title: string; handler: () => void }[] = [
      {
        title: 'Clear All Storage And Reload',
        handler: async () => {
          MMKVStorage.clearAll();
          DevSettings.reload();
        },
      },
    ];

    devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
  }
};
