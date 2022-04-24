/* eslint-disable no-console */
import { CommonSize } from '@core/interfaces';
import { Language } from '@core/types';
import { FC, memo } from 'react';
import isEqual from 'react-fast-compare';
import { ColorValue, Insets, Platform } from 'react-native';
import { getLocales } from 'react-native-localize';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export const randomColorGenerator = (): ColorValue => `#${Math.random().toString(16).slice(-6)}`;

export const getCurrentLanguage = (): Language => {
  const [{ languageCode }] = getLocales();

  switch (languageCode) {
    case 'en':
      return 'en-US';
    case 'ja':
      return 'ja-JP';
    case 'vi':
      return 'vi-VN';
    default:
      return 'en-US';
  }
};

export const createHitSlop = (insetValue = 8): Insets => ({
  top: insetValue,
  left: insetValue,
  right: insetValue,
  bottom: insetValue,
});

export const resizeImage = (
  sizeType: 'width' | 'height',
  expectSize: number,
  currentWidth: number,
  currentHeight: number,
): CommonSize => {
  if (!expectSize) return { width: 0, height: 0 };
  const dimensionTarget = (sizeType === 'width' ? currentWidth : currentHeight) || 1;
  const scale = expectSize / dimensionTarget;
  return { width: currentWidth * scale, height: currentHeight * scale };
};

export const comparedMemo = <T>(Component: FC<T>) => memo(Component, isEqual);

export const logger: typeof console.log = (message, ...optionalParams) => {
  if (!__DEV__) return;
  if (typeof message === 'object') {
    const params = optionalParams.length ? ['\n[Logger] Optional Params:', optionalParams] : [];
    console.log('[Logger] Message:', JSON.stringify(message, null, 2), ...params);
    return;
  }

  console.log(message, ...optionalParams);
};

export const wait = (timeout = 500) => new Promise<void>(resolve => setTimeout(resolve, timeout));

export const createArray = (length = 1) => new Array(length).fill(0).map((_, i) => i);
