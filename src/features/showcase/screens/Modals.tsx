import { Button, Modal, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';
import { ShowcaseItem } from '../components';
import useModalsContainer from '../containers/useModalsContainer';

const Modals = () => {
  const styles = useStyle(createStyles);
  const {
    showAlert,
    dismissModal,
    openModal,
    openBottomModal,
    dismissBottomModal,
    isBottomModalVisible,
    isModalVisible,
    ModalTexts,
    bottomModalSafeArea,
  } = useModalsContainer();

  return (
    <>
      <StackContainer headerTitle="Modals" wrapperStyle={globalStyles.flexFillCenter}>
        <ShowcaseItem title="Show modal" onPress={openModal} />
        <Spacer h={16} />
        <ShowcaseItem title="Show bottom modal" onPress={openBottomModal} />
        <Spacer h={16} />
        <ShowcaseItem title="Show alert" onPress={showAlert} />
      </StackContainer>

      <Modal isVisible={isModalVisible} onBackdropPress={dismissModal}>
        <View style={[styles.modal, styles.modalContainer]}>
          {ModalTexts}

          <Spacer h={16} />

          <Button title="Dismiss modal" onPress={dismissModal} />
        </View>
      </Modal>

      <Modal
        isVisible={isBottomModalVisible}
        type="bottomSheet"
        onBackdropPress={dismissBottomModal}
      >
        <View style={[styles.modal, styles.bottomModalContainer]}>
          {ModalTexts}

          <Spacer h={16} />

          <Button title="Dismiss modal" onPress={dismissModal} />
          <Spacer h={bottomModalSafeArea} />
        </View>
      </Modal>
    </>
  );
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    modal: {
      backgroundColor: colors.white,
      padding: 16,
    },
    modalContainer: {
      marginHorizontal: 32,
      borderRadius: 12,
    },
    bottomModalContainer: {
      paddingBottom: 0,
    },
  });

export default Modals;
