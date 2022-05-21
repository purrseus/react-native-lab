/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { CommonSize } from '@core/interfaces';
import { Language } from '@core/types';
import { FC, memo } from 'react';
import isEqual from 'react-fast-compare';
import { ColorValue, Insets } from 'react-native';
import { getLocales } from 'react-native-localize';

export const currentTimeStamp = () => +new Date();

export const randomColor = (): ColorValue => `#${Math.random().toString(16).slice(-6)}`;

export const alphaHexColor = (hexColor: string, opacity: number) =>
  `${hexColor}${`${(Math.min(Math.max(opacity, 0), 1) * 255).toString(16)}0`.slice(0, 2)}`;

export const compareMemo = <T>(Component: FC<T>) => memo(Component, isEqual);

export const wait = (timeout = ONE_SECOND) =>
  new Promise<void>(resolve => setTimeout(resolve, timeout));

export const createArray = (length = 1) => new Array(length).fill(0).map((_, i) => i);

export const createHitSlop = (insetValue = 8): Insets => ({
  top: insetValue,
  left: insetValue,
  right: insetValue,
  bottom: insetValue,
});

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

export const deepAccessObject = <V, T extends Record<string, any> = {}>(
  arrKey: [keyof T],
  target: T,
): T | V => {
  if (!arrKey.length) return target;
  return arrKey.reduce((acc, cur) => {
    if (!!acc && typeof acc === 'object' && cur in acc) return acc[cur];
    return acc;
  }, target);
};
