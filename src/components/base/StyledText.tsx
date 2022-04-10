import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { createHitSlop } from '@utilities';
import React, { FC } from 'react';
import { Text, TextProps, TouchableOpacity } from 'react-native';

export interface StyledTextProps extends TextProps {
  text: string;
  hitSlop?: number;
}

const StyledText: FC<StyledTextProps> = ({ text, style, onPress, hitSlop, ...props }) => {
  const hitSlopInsets = createHitSlop(hitSlop);
  const styles = useStyle(styleCallback);

  const TextComponent: FC = () => (
    <Text adjustsFontSizeToFit allowFontScaling={false} {...props} style={[styles.text, style]}>
      {text}
    </Text>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlopInsets} style={styles.touchable}>
      <TextComponent />
    </TouchableOpacity>
  ) : (
    <TextComponent />
  );
};

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    text: {
      fontSize: 14,
      color: colors.primaryText,
    },
    touchable: {
      flexWrap: 'wrap',
    },
  });

export default StyledText;
