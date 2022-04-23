import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { comparedMemo } from '@utilities';
import React from 'react';
import Image, { ImageProps } from './Image';

interface IconProps extends ImageProps<true> {
  size?: number;
}

const Icon = comparedMemo<IconProps>(({ size, style, ...props }) => {
  const styles = useStyle(styleCallback);

  return (
    <Image
      {...props}
      cached
      fullSize
      expectWidth={size}
      expectHeight={size}
      style={[styles.icon, style]}
    />
  );
});

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    icon: {
      backgroundColor: colors.transparent,
    },
  });

export default Icon;
