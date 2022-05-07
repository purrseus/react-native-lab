import { DEFAULT_ICON_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React from 'react';
import Image, { ImageProps } from './Image';

export interface IconProps extends ImageProps<true> {
  size?: number;
}

const Icon = compareMemo<IconProps>(({ size = DEFAULT_ICON_SIZE, style, ...props }) => {
  const styles = useStyle(styleCallback);

  return <Image {...props} style={[styles.icon, { width: size, height: size }, style]} />;
});

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    icon: {
      backgroundColor: colors.transparent,
    },
  });

export default Icon;
