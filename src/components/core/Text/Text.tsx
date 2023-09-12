import { DEFAULT_FONT_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle, useThrottle } from '@hooks';
import { compareMemo } from '@utils';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {}

const Text = compareMemo<TextProps>(({ style, onPress, ...props }) => {
  const styles = useStyle(createStyles);
  const handleOnPress = useThrottle(onPress || (() => null), [onPress], duration({ s: 0.5 }));

  return (
    <RNText
      allowFontScaling={false}
      onPress={onPress ? handleOnPress : undefined}
      {...props}
      style={[styles.text, style]}
    />
  );
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    text: {
      fontSize: DEFAULT_FONT_SIZE,
      color: colors.primaryText,
    },
  });

export default Text;
