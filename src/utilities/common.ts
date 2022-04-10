import { CommonSize } from '@core/interfaces';
import { Language } from '@core/types';
import { ColorValue, Insets, Platform } from 'react-native';
import { getLocales } from 'react-native-localize';

export const isAndroid = () => Platform.OS === 'android';

export const isIos = () => Platform.OS === 'ios';

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
