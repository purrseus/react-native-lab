import { ONE_SECOND } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle, useThrottle } from '@hooks';
import { compareMemo } from '@utilities';
import { forwardRef, useCallback } from 'react';
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
  pressInStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const PressArea = compareMemo<View, PressAreaProps>(
  forwardRef(({ throttle = ONE_SECOND / 2, onPress, pressInStyle, style, ...props }, ref) => {
    const styles = useStyle(createStyles);

    const handleOnPress = useThrottle(onPress || (() => null), [onPress], throttle);

    const handleStateStyle = useCallback(
      ({ pressed }: PressableStateCallbackType) =>
        pressed ? [style, [styles.pressed, pressInStyle]] : style,
      [style, pressInStyle, styles.pressed],
    );

    return (
      <Pressable
        {...props}
        ref={ref}
        android_disableSound={true}
        android_ripple={null}
        pressRetentionOffset={(props.hitSlop || 0) * 2}
        onPress={throttle ? handleOnPress : onPress}
        style={handleStateStyle}
      />
    );
  }),
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    pressed: {
      opacity: 0.8,
    },
  });

export default PressArea;
