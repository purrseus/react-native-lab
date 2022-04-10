import { Platform } from 'react-native';

export const isAndroid = () => Platform.OS === 'android';

export const isIos = () => Platform.OS === 'ios';

export const randomColorGenerator = () => `#${Math.random().toString(16).slice(-6)}`;
