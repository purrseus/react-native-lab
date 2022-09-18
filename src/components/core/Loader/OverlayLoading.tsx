import { StyleCallbackParams } from '@core/interfaces';
import { useLoading, useStyle } from '@hooks';
import { alphaHexColor, compareMemo } from '@utilities';
import React from 'react';
import { View } from 'react-native';
import Modal from '../Modal/Modal';
import ActivityIndicator from './ActivityIndicator';

const OverlayLoading = compareMemo(() => {
  const { isLoading } = useLoading();
  const styles = useStyle(createStyles);

  return (
    <Modal isVisible={isLoading}>
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
