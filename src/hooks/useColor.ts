import { darkTheme, lightTheme } from '@themes';
import { useColorScheme } from 'react-native';

const useColor = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

export default useColor;
