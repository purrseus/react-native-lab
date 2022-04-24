/* eslint-disable react-native/no-inline-styles */
import { comparedMemo } from '@utilities';
import React from 'react';
import { View, ViewProps } from 'react-native';

const Row = comparedMemo<ViewProps>(({ children, style, ...props }) => {
  return (
    <View {...props} style={[{ flexDirection: 'row' }, style]}>
      {children}
    </View>
  );
});

export default Row;
