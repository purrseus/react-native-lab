/* eslint-disable react-hooks/exhaustive-deps */
import { StyleCallbackParams } from '@core/interfaces';
import { useLoading, useStyle } from '@hooks';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';
import { alphaHexColor, compareMemo } from '@utilities';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import Modal, { ModalProps } from './Modal';

const OverlayLoading = compareMemo<Partial<Pick<ModalProps, 'isVisible'>>>(({ isVisible }) => {
  const { isLoading, toggleLoading } = useLoading();
  const styles = useStyle(createStyles);
  const navigationState = useNavigationState(state => state);

  useFocusEffect(
    useCallback(() => {
      if (typeof isVisible === 'undefined') toggleLoading(false);
    }, [navigationState]),
  );

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
