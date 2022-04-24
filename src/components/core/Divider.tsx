/* eslint-disable react-native/no-inline-styles */
import { colors } from '@themes';
import { comparedMemo } from '@utilities';
import React from 'react';
import { ColorValue, View, ViewStyle } from 'react-native';

type DividerPropKeys = 'width' | 'borderRadius' | 'marginHorizontal' | 'marginVertical';

export interface DividerProps extends Pick<ViewStyle, DividerPropKeys> {
  color?: ColorValue;
  height?: number;
}

const Divider = comparedMemo<DividerProps>(({ color = colors.darkGray, height = 1, ...props }) => {
  return (
    <View
      style={{
        height,
        backgroundColor: color,
        alignSelf: 'stretch',
        ...props,
      }}
    />
  );
});

export default Divider;
