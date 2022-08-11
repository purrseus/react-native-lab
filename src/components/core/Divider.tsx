/* eslint-disable react-native/no-inline-styles */
import { colors } from '@themes';
import { compareMemo } from '@utilities';
import React from 'react';
import { ColorValue, StyleSheet, View, ViewStyle } from 'react-native';

type DividerPropKeys = 'width' | 'borderRadius' | 'marginHorizontal' | 'marginVertical';

export interface DividerProps extends Pick<ViewStyle, DividerPropKeys> {
  color?: ColorValue;
  height?: number;
}

const Divider = compareMemo<DividerProps>(
  ({ color = colors.darkGray, height = StyleSheet.hairlineWidth, ...props }) => {
    return (
      <View
        style={{
          borderBottomWidth: height <= 1 ? StyleSheet.hairlineWidth : height,
          borderBottomColor: color,
          alignSelf: 'stretch',
          ...props,
        }}
      />
    );
  },
);

export default Divider;
