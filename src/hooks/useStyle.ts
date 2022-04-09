import { StyleCallbackParams } from '@core/interfaces';
import { darkTheme, lightTheme } from '@themes';
import { StyleSheet, useColorScheme, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type StyleCallback = (
  params: StyleCallbackParams,
) => ReturnType<StyleCallbackParams['create']>;

const useStyle = <T extends StyleCallback>(styleCallback: T): ReturnType<T> => {
  const dimensions = useWindowDimensions();
  const colorScheme = useColorScheme();
  const edgeInsets = useSafeAreaInsets();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  return styleCallback({
    dimensions,
    colors,
    edgeInsets,
    create: StyleSheet.create,
  }) as ReturnType<T>;
};

export default useStyle;
