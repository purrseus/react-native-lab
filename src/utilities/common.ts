/* eslint-disable react-native/split-platform-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { CommonSize, Language } from '@core/types';
import { MMKVStorage } from '@store/integration';
import { ForwardRefExoticComponent, memo, PropsWithoutRef, RefAttributes } from 'react';
import isEqual from 'react-fast-compare';
import { DevSettings, ShadowStyleIOS, UIManager, ViewStyle } from 'react-native';
import { getLocales } from 'react-native-localize';
import { isAndroid } from './os';

export const currentTimestamp = () => +new Date();

export const randomColor = () => `#${Math.random().toString(16).slice(-6)}`;

export const alphaHexColor = (hexColor: string, opacity: number) =>
  `${hexColor}${`${(Math.min(Math.max(opacity, 0), 1) * 255).toString(16)}0`.slice(0, 2)}`;

export const compareMemo = <T, P = undefined>(
  Component: P extends undefined
    ? (props: T) => JSX.Element
    : ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => memo(Component, isEqual);

export const wait = (timeout = ONE_SECOND) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout));

export const createArray = (length = 0) => Array.from({ length }, (_, i) => i);

export const createShadow = (
  shadowColor = 'transparent',
  shadowOffset = [0, 0],
  shadowOpacity = 0,
  shadowRadius = 0,
  elevation = 0,
): Required<ShadowStyleIOS & Pick<ViewStyle, 'elevation'>> => ({
  shadowColor,
  shadowOffset: { width: shadowOffset[0], height: shadowOffset[1] },
  shadowOpacity,
  shadowRadius,
  elevation,
});

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
        title: 'Clear all storage and reload',
        handler: async () => {
          MMKVStorage.clearAll();
          DevSettings.reload();
        },
      },
    ];

    devSettingItems.forEach(item => DevSettings.addMenuItem(item.title, item.handler));
  }
};
