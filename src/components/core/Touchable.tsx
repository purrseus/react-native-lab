/* eslint-disable react-hooks/exhaustive-deps */
import { comparedMemo, createHitSlop } from '@utilities';
import { throttle } from 'lodash';
import React, { useCallback } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends Omit<TouchableOpacityProps, 'hitSlop'> {
  wait?: number;
  hitSlop?: number;
}

const Touchable = comparedMemo<TouchableProps>(
  ({ children, wait = 1000, onPress = () => null, hitSlop, ...props }) => {
    const handleOnPress = useCallback(
      throttle(onPress, wait, {
        leading: true,
        trailing: true,
      }),
      [onPress],
    );

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        {...props}
        hitSlop={createHitSlop(hitSlop)}
        onPress={!wait ? onPress : handleOnPress}
      >
        {children}
      </TouchableOpacity>
    );
  },
);

export default Touchable;
