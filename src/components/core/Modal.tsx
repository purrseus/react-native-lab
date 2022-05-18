import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React from 'react';
import { Dimensions } from 'react-native';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';

type CombinedModalProps = Partial<RNModalProps> & Pick<RNModalProps, 'children' | 'isVisible'>;

export interface ModalProps extends CombinedModalProps {
  type?: 'modal' | 'bottomSheet';
}

type AnimationType = Record<
  NonNullable<ModalProps['type']>,
  Pick<ModalProps, 'animationIn' | 'animationOut'>
>;

const DEFAULT_BACKDROP_OPACITY = 1 / 5;

const animationType: AnimationType = {
  modal: { animationIn: 'fadeIn', animationOut: 'fadeOut' },
  bottomSheet: { animationIn: 'slideInUp', animationOut: 'slideOutDown' },
};

const Modal = compareMemo<ModalProps>(({ children, type = 'modal', style, ...props }) => {
  const { width, height } = Dimensions.get('screen');
  const styles = useStyle(createStyles);

  return (
    <RNModal
      {...animationType[type]}
      backdropOpacity={DEFAULT_BACKDROP_OPACITY}
      {...props}
      avoidKeyboard
      statusBarTranslucent
      deviceWidth={width}
      deviceHeight={height}
      style={[styles.common, styles[type], style]}
    >
      {children}
    </RNModal>
  );
});

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    common: {
      padding: 0,
      margin: 0,
      alignItems: 'center',
    },
    modal: {
      justifyContent: 'center',
    },
    bottomSheet: {
      justifyContent: 'flex-end',
    },
  });

export default Modal;
