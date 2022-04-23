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
        borderColor: color,
        borderWidth: height / 2,
        alignSelf: 'stretch',
        ...props,
      }}
    />
  );
});

export default Divider;
