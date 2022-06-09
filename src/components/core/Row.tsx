/* eslint-disable react-native/no-inline-styles */
import { compareMemo } from '@utilities';
import React from 'react';
import { View, ViewProps } from 'react-native';

type RowProps = ViewProps & { reverse?: boolean };

const Row = compareMemo<RowProps>(({ reverse = false, children, style, ...props }) => (
  <View {...props} style={[style, { flexDirection: reverse ? 'row-reverse' : 'row' }]}>
    {children}
  </View>
));

export default Row;
