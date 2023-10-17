import { DEFAULT_FONT_SIZE } from '@core/constants';
import { useTailwind, useThrottle } from '@hooks';
import { compareMemo } from '@utils';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';

export interface TextProps extends RNTextProps {
  style?: Style;
}

const Text = compareMemo<TextProps>(({ style, onPress, ...props }) => {
  const tw = useTailwind();
  const handleOnPress = useThrottle(onPress || (() => null), [onPress], duration({ s: 0.5 }));

  return (
    <RNText
      allowFontScaling={false}
      onPress={onPress ? handleOnPress : undefined}
      {...props}
      style={tw.style(`text-[${DEFAULT_FONT_SIZE}px] text-zinc-700 dark:text-white`, style)}
    />
  );
});

export default Text;
