import { ONE_SECOND } from '@core/constants';
import { useThrottle } from '@hooks';
import { compareMemo } from '@utilities';
import React, { forwardRef } from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

export interface PressAreaProps extends PressableProps {
  throttle?: number;
  hitSlop?: number;
  stateStyle?: (state: PressableStateCallbackType) => StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const PressArea = compareMemo<View, PressAreaProps>(
  forwardRef(({ throttle = ONE_SECOND / 2, onPress, stateStyle, style, ...props }, ref) => {
    const handleOnPress = useThrottle(
      onPress as NonNullable<PressAreaProps['onPress']>,
      [onPress],
      throttle,
    );

    return (
      <Pressable
        {...props}
        ref={ref}
        android_disableSound={true}
        android_ripple={null}
        pressRetentionOffset={(props.hitSlop || 0) * 2}
        onPress={throttle && onPress ? handleOnPress : onPress}
        style={stateStyle ? state => [style, stateStyle(state)] : style}
      />
    );
  }),
);

export default PressArea;
