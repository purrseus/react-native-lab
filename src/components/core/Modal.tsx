import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { comparedMemo } from '@utilities';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import RNModal, { ModalProps as RNModalProps } from 'react-native-modal';

type CombinedModalProps = Partial<RNModalProps> & Pick<RNModalProps, 'children' | 'isVisible'>;

interface ModalProps extends CombinedModalProps {
  type?: 'modal' | 'bottomSheet';
}

const DEFAULT_BACKDROP_OPACITY = 1 / 3;

const Modal = comparedMemo<ModalProps>(({ children, type = 'modal', style, ...props }) => {
  const { width, height } = useWindowDimensions();
  const styles = useStyle(styleCallback);

  return (
    <RNModal
      animationIn="fadeIn"
      animationOut="fadeOut"
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

const styleCallback = ({ create }: StyleCallbackParams) =>
  create({
    common: {
      padding: 0,
      margin: 0,
    },
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomSheet: {
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  });

export default Modal;
