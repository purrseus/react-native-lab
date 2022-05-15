/* eslint-disable react-native/no-inline-styles */
import { compareMemo } from '@utilities';
import React from 'react';
import { View, ViewProps } from 'react-native';

const Row = compareMemo<ViewProps>(({ children, style, ...props }) => {
  return (
    <View {...props} style={[style, { flexDirection: 'row' }]}>
      {children}
    </View>
  );
});

export default Row;
