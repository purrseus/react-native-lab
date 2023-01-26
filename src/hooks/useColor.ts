import { useCommonStore } from '@stores';
import { darkTheme, lightTheme } from '@themes';
import isEqual from 'react-fast-compare';
import { useColorScheme } from 'react-native';

const useColor = () => {
  const colorScheme = useColorScheme();
  const theme = useCommonStore(state => state.theme, isEqual);
  return (theme === 'auto' ? colorScheme : theme) === 'dark' ? darkTheme : lightTheme;
};

export default useColor;
