import { ONE_SECOND } from '@core/constants';
import { useThrottle } from '@hooks';
import { createHitSlop } from '@utilities';
import React, { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface TouchableProps extends Omit<TouchableOpacityProps, 'hitSlop'> {
  wait?: number;
  hitSlop?: number;
}

const Touchable = forwardRef<TouchableOpacity, TouchableProps>(
  ({ children, wait = ONE_SECOND, onPress = () => null, hitSlop, ...props }, ref) => {
    const handleOnPress = useThrottle(onPress, [onPress], wait);

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        {...props}
        ref={ref}
        hitSlop={hitSlop ? createHitSlop(hitSlop) : undefined}
        onPress={!wait ? onPress : handleOnPress}
      >
        {children}
      </TouchableOpacity>
    );
  },
);

export default Touchable;
