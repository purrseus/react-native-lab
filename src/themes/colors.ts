import { ColorValue } from 'react-native';

/**
 * @see lightTheme
 * @see darkTheme
 */
type ColorName =
  | 'transparent'
  | 'black'
  | 'white'
  | 'darkGray'
  | 'lightGray'
  | 'purple'
  | 'orange'
  | 'red'
  | 'blue'
  | 'primary'
  | 'secondary'
  | 'tabBlur'
  | 'tabBarBackground'
  | 'shadow'
  | 'background'
  | 'primaryText'
  | 'backgroundImage'
  | 'refreshControlBackground'
  | 'switchTrackInactive';

type ThemeColors = Record<ColorName, ColorValue>;

export const colors = {
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  darkGray: '#888888',
  lightGray: '#DEDEDE',
  purple: '#4c37a6',
  orange: '#ff9e50',
  red: '#e14e50',
  blue: '#3593f7',
  primary: '#06d283',
  secondary: '#06e273',
};

/**
 * @see ColorName
 */
export const lightTheme: ThemeColors = {
  ...colors,
  tabBlur: '#888888',
  tabBarBackground: '#FFFFFF',
  shadow: '#000000',
  background: '#FFFFFF',
  primaryText: '#3B3B3B',
  backgroundImage: '#C4C4C4',
  refreshControlBackground: '#FAFAFA',
  switchTrackInactive: '#C4C4C4',
};

/**
 * @see ColorName
 */
export const darkTheme: ThemeColors = {
  ...colors,
  tabBlur: '#888888',
  tabBarBackground: '#111111',
  shadow: '#EFEFEF',
  background: '#000000',
  primaryText: '#FFFFFF',
  backgroundImage: '#343434',
  refreshControlBackground: '#222222',
  switchTrackInactive: '#C4C4C4',
};
