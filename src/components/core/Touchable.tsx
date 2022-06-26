/* eslint-disable react-native/no-inline-styles */
import { ONE_SECOND } from '@core/constants';
import { useThrottle } from '@hooks';
import { compareMemo, createHitSlop } from '@utilities';
import React, { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends Omit<TouchableOpacityProps, 'hitSlop'> {
  wait?: number;
  hitSlop?: number;
  row?: boolean;
}

const Touchable = compareMemo<TouchableOpacity, TouchableProps>(
  forwardRef(({ wait = ONE_SECOND / 2, onPress, row = false, hitSlop, style, ...props }, ref) => {
    const handleOnPress = useThrottle(onPress || (() => null), [onPress], wait);

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        {...props}
        ref={ref}
        hitSlop={hitSlop ? createHitSlop(hitSlop) : undefined}
        onPress={!wait ? onPress : handleOnPress}
        style={[style, row && { flexDirection: 'row' }]}
      />
    );
  }),
);

export default Touchable;
