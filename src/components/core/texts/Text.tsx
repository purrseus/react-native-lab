import { DEFAULT_FONT_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import Touchable, { TouchableProps } from '../buttons/Touchable';

export interface TextProps
  extends RNTextProps,
    Pick<TouchableProps, 'hitSlop' | 'onPress' | 'wait'> {}

const Text = compareMemo<TextProps>(({ style, onPress, hitSlop = 8, wait, ...props }) => {
  const styles = useStyle(createStyles);

  const TextComponent = () => (
    <RNText allowFontScaling={false} {...props} style={[styles.text, style]} />
  );

  return onPress ? (
    <Touchable {...{ onPress, hitSlop, wait }} style={styles.touchable}>
      <TextComponent />
    </Touchable>
  ) : (
    <TextComponent />
  );
});

const createStyles = ({ create, colors, fonts }: StyleCallbackParams) =>
  create({
    text: {
      fontSize: DEFAULT_FONT_SIZE,
      color: colors.primaryText,
      fontFamily: fonts.quicksandMedium,
    },
    touchable: {
      flexWrap: 'wrap',
    },
  });

export default Text;
