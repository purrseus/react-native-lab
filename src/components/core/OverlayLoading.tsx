import { StyleCallbackParams } from '@core/interfaces';
import { useLoading, useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React from 'react';
import { View } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import Modal from './Modal';

const OverlayLoading = compareMemo(() => {
  const { isLoading } = useLoading();
  const styles = useStyle(styleCallback);

  return (
    <Modal isVisible={isLoading}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
});

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    activityIndicatorWrapper: {
      padding: 20,
      backgroundColor: colors.blackOpacity(0.6),
      borderRadius: 12,
    },
  });

export default OverlayLoading;
