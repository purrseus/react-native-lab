/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export const platformSelect = (android: any, ios: any) =>
  Platform.select({
    android,
    ios,
  });
