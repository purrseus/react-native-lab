import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { comparedMemo } from '@utilities';
import React, { FC } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import Touchable, { TouchableProps } from './Touchable';

export interface TextProps
  extends RNTextProps,
    Pick<TouchableProps, 'hitSlop' | 'onPress' | 'wait'> {
  text: string;
}

const DEFAULT_FONT_SIZE = 14;

const Text = comparedMemo<TextProps>(({ text, style, onPress, hitSlop, wait, ...props }) => {
  const styles = useStyle(styleCallback);

  const TextComponent: FC = () => (
    <RNText adjustsFontSizeToFit allowFontScaling={false} {...props} style={[styles.text, style]}>
      {text}
    </RNText>
  );

  return onPress ? (
    <Touchable {...{ onPress, hitSlop, wait }} style={styles.touchable}>
      <TextComponent />
    </Touchable>
  ) : (
    <TextComponent />
  );
});

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    text: {
      fontSize: DEFAULT_FONT_SIZE,
      color: colors.primaryText,
    },
    touchable: {
      flexWrap: 'wrap',
    },
  });

export default Text;
