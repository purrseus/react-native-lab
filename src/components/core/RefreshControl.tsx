import { useColor } from '@hooks';
import { comparedMemo } from '@utilities';
import React from 'react';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

const RefreshControl = comparedMemo<RefreshControlProps>(({ ...props }) => {
  const colors = useColor();

  return (
    <RNRefreshControl
      {...props}
      colors={[colors.primary, colors.secondary]}
      progressBackgroundColor={colors.refreshControlBackground}
      tintColor={colors.primary}
    />
  );
});

export default RefreshControl;
