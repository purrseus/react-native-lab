/* eslint-disable react-native/no-inline-styles */
import { comparedMemo } from '@utilities';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface RowProps extends ViewProps {}

const Row = comparedMemo<RowProps>(({ children, style, ...props }) => {
  return (
    <View {...props} style={[{ flexDirection: 'row' }, style]}>
      {children}
    </View>
  );
});

export default Row;
