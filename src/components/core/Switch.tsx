import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo, isAndroid } from '@utilities';
import React, { ReactNode, useCallback, useEffect } from 'react';
import {
  ActivityIndicatorProps,
  ColorValue,
  Platform,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ActivityIndicator from './ActivityIndicator';
import Touchable from './Touchable';

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  ActiveIcon?: ReactNode;
  /**
   * Android only
   */
  thumbScaleAnimated?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TRACK_WIDTH = 52;
const TRACK_HEIGHT = 32;
const THUMB_SIZE = TRACK_HEIGHT;
const INPUT_RANGE: ReadonlyArray<number> = [0, 1];

const AnimatedTouchable = Animated.createAnimatedComponent(Touchable);

const Switch = compareMemo<SwitchProps>(
  ({
    value,
    onChange,
    disabled = false,
    ActiveIcon,
    thumbScaleAnimated = true,
    loading = false,
    style,
  }) => {
    const styles = useStyle(createStyles);
    const [trackActiveColor, trackInactiveColor] = styles.trackColor as (string | number)[];
    const [thumbActiveColor, thumbInactiveColor] = styles.thumbColor as (string | number)[];
    const statusAnimated = useSharedValue(+value);

    const trackAnimatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(statusAnimated.value, INPUT_RANGE, [
        trackInactiveColor,
        disabled ? trackInactiveColor : trackActiveColor,
      ]);

      return { backgroundColor: backgroundColor as ColorValue };
    }, [disabled]);

    const thumbAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(statusAnimated.value, INPUT_RANGE, [
        0,
        TRACK_WIDTH - THUMB_SIZE,
      ]);
      const backgroundColor = interpolateColor(statusAnimated.value, INPUT_RANGE, [
        thumbInactiveColor,
        disabled ? thumbInactiveColor : thumbActiveColor,
      ]);
      const scale = interpolate(statusAnimated.value, INPUT_RANGE, [0.66, 1]);

      return {
        transform: [{ translateX }, { scale: thumbScaleAnimated && isAndroid ? scale : 1 }],
        backgroundColor: backgroundColor as ColorValue,
      };
    }, [disabled]);

    const handleChangeValue = useCallback(() => onChange(!value), [onChange, value]);

    useEffect(() => {
      statusAnimated.value = withTiming(+value);
    }, [value, statusAnimated]);

    return (
      <View style={[styles.container, style]}>
        <AnimatedTouchable
          activeOpacity={1}
          onPress={handleChangeValue}
          disabled={disabled || loading}
          style={[styles.track, trackAnimatedStyle]}
        >
          <View style={styles.thumbWrapper}>
            <Animated.View style={[styles.thumb, thumbAnimatedStyle]}>
              {loading ? (
                <ActivityIndicator
                  color={(value ? thumbInactiveColor : thumbActiveColor) as ColorValue}
                  size={Platform.select<ActivityIndicatorProps['size']>({
                    ios: 'small',
                    android: THUMB_SIZE - 16,
                  })}
                />
              ) : (
                ActiveIcon
              )}
            </Animated.View>
          </View>
        </AnimatedTouchable>
      </View>
    );
  },
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    container: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    track: {
      width: TRACK_WIDTH,
      height: TRACK_HEIGHT,
      borderRadius: TRACK_HEIGHT / 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    trackColor: [colors.primary, colors.switchTrackInactive] as ViewStyle,
    thumbColor: [colors.white, colors.darkGray] as ViewStyle,
    thumbWrapper: {
      padding: 4,
      width: THUMB_SIZE,
      height: THUMB_SIZE,
    },
    thumb: {
      ...globalStyles.flexCenter,
      borderRadius: 100,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 8,
    },
  });

export default Switch;
