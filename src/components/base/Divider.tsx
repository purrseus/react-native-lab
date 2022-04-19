/* eslint-disable react-native/no-inline-styles */
import { colors } from '@themes';
import { comparedMemo } from '@utilities';
import React from 'react';
import { ColorValue, View, ViewProps } from 'react-native';

export interface DividerProps extends ViewProps {
  color?: ColorValue;
  width?: number;
  height?: number;
  borderRadius?: number;
  spacing?: number;
}

const Divider = comparedMemo<DividerProps>(
  ({ color = colors.darkGray, width, height = 1, borderRadius = 0, spacing = 0 }) => {
    return (
      <View
        style={{
          width,
          borderRadius,
          borderColor: color,
          borderTopWidth: height,
          marginHorizontal: spacing,
          alignSelf: 'stretch',
        }}
      />
    );
  },
);

export default Divider;
