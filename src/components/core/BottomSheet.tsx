import { DEFAULT_BACKDROP_OPACITY } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import RNBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useStyle } from '@hooks';
import { compareMemo, createShadow } from '@utilities';
import React, { forwardRef, useCallback } from 'react';

interface BottomSheetProps
  extends RNBottomSheetProps,
    Pick<BottomSheetDefaultBackdropProps, 'enableTouchThrough'> {
  backdropOpacity?: number;
  pressBackdropBehavior?: BottomSheetDefaultBackdropProps['pressBehavior'];
  hasHandle?: boolean;
}

const BottomSheet = compareMemo(
  forwardRef<BottomSheetMethods, BottomSheetProps>(
    (
      {
        backdropOpacity = DEFAULT_BACKDROP_OPACITY,
        enableTouchThrough,
        pressBackdropBehavior,
        hasHandle = true,
        handleStyle,
        handleIndicatorStyle,
        backgroundStyle,
        ...props
      },
      ref,
    ) => {
      const styles = useStyle(createStyle);

      const backdropComponent = useCallback(
        (backdropProps: BottomSheetDefaultBackdropProps) => (
          <BottomSheetBackdrop
            {...backdropProps}
            enableTouchThrough={enableTouchThrough}
            pressBehavior={pressBackdropBehavior}
            opacity={backdropOpacity}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        ),
        [backdropOpacity, enableTouchThrough, pressBackdropBehavior],
      );

      return (
        <RNBottomSheet
          {...props}
          {...{ ref, backdropComponent }}
          keyboardBlurBehavior="restore"
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
      ...createShadow(colors.shadow, [0, 0], 0.1, 8, 16),
    },
    backdrop: {
      backgroundColor: colors.black,
    },
    hidedHandle: {
      display: 'none',
    },
  });

export default BottomSheet;
