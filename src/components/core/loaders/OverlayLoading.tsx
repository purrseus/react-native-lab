import { StyleCallbackParams } from '@core/interfaces';
import { useLoading, useStyle } from '@hooks';
import { alphaHexColor, compareMemo } from '@utilities';
import React from 'react';
import { View } from 'react-native';
import Modal, { ModalProps } from '../modals/Modal';
import ActivityIndicator from './ActivityIndicator';

const OverlayLoading = compareMemo<Partial<Pick<ModalProps, 'isVisible'>>>(({ isVisible }) => {
  const { isLoading } = useLoading();
  const styles = useStyle(createStyles);

  return (
    <Modal isVisible={isVisible || isLoading}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    activityIndicatorWrapper: {
      alignSelf: 'center',
      padding: 20,
      backgroundColor: alphaHexColor(colors.black, 0.6),
      borderRadius: 12,
    },
  });

export default OverlayLoading;
