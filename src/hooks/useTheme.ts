import { useCommonStore } from '@stores';
import { darkTheme, lightTheme } from '@themes';
import { useColorScheme } from 'react-native';

const useTheme = () => {
  const colorScheme = useColorScheme();
  const theme = useCommonStore(state => state.theme);
  const isDarkMode = (theme === 'auto' ? colorScheme : theme) === 'dark';
  return { colors: isDarkMode ? darkTheme : lightTheme, isDarkMode };
};

export default useTheme;
