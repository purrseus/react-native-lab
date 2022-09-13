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
  const styles = useStyle(createStyles);

  return <Image {...props} cached style={[styles.icon, { width: size, height: size }, style]} />;
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    icon: {
      backgroundColor: colors.transparent,
    },
  });

export default Icon;
