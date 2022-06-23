import { StyleCallbackParams } from '@core/interfaces';
import RNBottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useStyle } from '@hooks';
import { compareMemo, createShadow } from '@utilities';
import React, { FC, forwardRef, useCallback, useMemo } from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface BottomSheetProps extends RNBottomSheetProps {
  backdropOpacity?: number;
  hasHandle?: boolean;
}

const CustomBackdrop: FC<BottomSheetBackdropProps & Pick<BottomSheetProps, 'backdropOpacity'>> = ({
  animatedIndex,
  style,
  backdropOpacity = 0,
}) => {
  const styles = useStyle(createStyle);

  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(animatedIndex.value, [-1, 0], [0, backdropOpacity], Extrapolate.CLAMP),
    }),
    [backdropOpacity],
  );

  const containerStyle = useMemo(
    () => [style, styles.backdrop, containerAnimatedStyle],
    [style, styles.backdrop, containerAnimatedStyle],
  );

  return <Animated.View style={containerStyle} />;
};

const BottomSheet = compareMemo(
  forwardRef<BottomSheetMethods, BottomSheetProps>(
    (
      {
        backdropOpacity = 0.3,
        hasHandle = true,
        handleStyle,
        handleIndicatorStyle,
        backgroundStyle,
        snapPoints,
        ...props
      },
      ref,
    ) => {
      const styles = useStyle(createStyle);

      const backdropComponent = useCallback(
        (backdropProps: BottomSheetBackdropProps) =>
          CustomBackdrop({ ...backdropProps, backdropOpacity }),
        [backdropOpacity],
      );

      return (
        <RNBottomSheet
          {...props}
          {...{ ref, snapPoints, backdropComponent }}
          topInset={styles.inset.top}
          handleStyle={[styles.handle, !hasHandle && styles.hidedHandle, handleStyle]}
          handleIndicatorStyle={[styles.indicator, handleIndicatorStyle]}
          backgroundStyle={[styles.background, backgroundStyle]}
        />
      );
    },
  ),
);

const createStyle = ({ create, edgeInsets, colors }: StyleCallbackParams) =>
  create({
    inset: {
      top: edgeInsets.top,
    },
    handle: {
      height: 16,
      paddingVertical: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    indicator: {
      backgroundColor: colors.bottomSheetIndicator,
    },
    background: {
      backgroundColor: colors.bottomSheetBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      ...createShadow(colors.shadow, [0, 0], 0.2, 8, 16),
    },
    backdrop: {
      backgroundColor: colors.black,
    },
    hidedHandle: {
      display: 'none',
    },
  });

export default BottomSheet;
