import { Platform } from 'react-native';

export const isAndroid = () => Platform.OS === 'android';
export const isIos = () => Platform.OS === 'ios';
export const platformSelect = <T>(android: T, ios: T) => Platform.select<T>({ android, ios });
