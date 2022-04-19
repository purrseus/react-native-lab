import { StyleCallbackParams } from '@core/interfaces';
import { darkTheme, lightTheme } from '@themes';
import { useMemo } from 'react';
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

  return useMemo(
    () =>
      styleCallback({
        dimensions,
        colors,
        edgeInsets,
        create: StyleSheet.create,
      }) as ReturnType<T>,
    [dimensions, edgeInsets, colors, styleCallback],
  );
};

export default useStyle;
