import { LanguageMap, Locale } from '@core/types';
import { ThrottleSettings } from 'lodash';
import { LinearGradientProps } from 'react-native-linear-gradient';
import { Edge } from 'react-native-safe-area-context';

export const TAB_BAR_HEIGHT = 70;
export const HORIZONTAL_SAFETY_EDGES: Edge[] = ['left', 'right'];
export const ONE_SECOND = 1000;
export const DEFAULT_FONT_SIZE = 14;
export const DEFAULT_ICON_SIZE = 24;
export const DEFAULT_DATE_TIME_FORMAT_TEMPLATE = 'DD/MMM/YYYY HH:mm';
export const DEFAULT_NUMBER_FORMAT_TEMPLATE = '0,0';
export const HORIZONTAL_GRADIENT_COORDINATES: Readonly<
  Required<Pick<LinearGradientProps, 'start' | 'end'>>
> = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
};
export const DEFAULT_THROTTLE_SETTINGS: Readonly<ThrottleSettings> = {
  leading: true,
  trailing: false,
};
export const LANGUAGE_MAP: Readonly<LanguageMap<Locale>> = {
  'en-US': 'en-gb',
  'vi-VN': 'vi',
};
