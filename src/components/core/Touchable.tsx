import { ONE_SECOND } from '@core/constants';
import { useThrottle } from '@hooks';
import { compareMemo, createHitSlop } from '@utilities';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends Omit<TouchableOpacityProps, 'hitSlop'> {
  wait?: number;
  hitSlop?: number;
}

const Touchable = compareMemo<TouchableProps>(
  ({ children, wait = ONE_SECOND, onPress = () => null, hitSlop, ...props }) => {
    const handleOnPress = useThrottle(onPress, [onPress], wait);

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
