import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { comparedMemo } from '@utilities';
import React from 'react';
import StyledImage, { RewrittenStyledImageProps } from './StyledImage';

interface StyledIconProps extends RewrittenStyledImageProps<true> {
  size?: number;
}

const StyledIcon = comparedMemo<StyledIconProps>(({ size, style, ...props }) => {
  const styles = useStyle(styleCallback);

  return (
    <StyledImage
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

export default StyledIcon;
