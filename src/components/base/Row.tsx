/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { View } from 'react-native';
import { ViewProps } from 'react-native';

interface RowProps extends ViewProps {}

const Row: FC<RowProps> = ({ children, style, ...props }) => {
  return (
    <View {...props} style={[{ flexDirection: 'row' }, style]}>
      {children}
    </View>
  );
};

export default Row;
