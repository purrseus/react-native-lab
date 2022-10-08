import { Button, Modal, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { View } from 'react-native';
import { ShowcaseItem } from '../components';
import { useModalContainer } from '../containers';

const Modals: ProtectedScreen<ProtectedScreenName.Modals> = () => {
  const styles = useStyle(createStyles);
  const { ModalTexts, ...container } = useModalContainer();

  return (
    <>
      <StackContainer
        headerTitle={ProtectedScreenName.Modals}
        wrapperType="scrollView"
        wrapperStyle={globalStyles.flexFillCenter}
      >
        <ShowcaseItem title="Show modal" onPress={container.openModal} />
        <Spacer h={16} />
        <ShowcaseItem title="Show bottom modal" onPress={container.openBottomModal} />
        <Spacer h={16} />
        <ShowcaseItem title="Show alert" onPress={container.showAlert} />
      </StackContainer>

      <Modal isVisible={container.isModalVisible} onBackdropPress={container.dismissModal}>
        <View style={[styles.modal, styles.modalContainer]}>
          {ModalTexts}

          <Spacer h={16} />

          <Button title="Dismiss modal" onPress={container.dismissModal} />
        </View>
      </Modal>

      <Modal
        isVisible={container.isBottomModalVisible}
        type="bottomSheet"
        onBackdropPress={container.dismissBottomModal}
      >
        <View style={[styles.modal, styles.bottomModalContainer]}>
          {ModalTexts}

          <Spacer h={16} />

          <Button title="Dismiss modal" onPress={container.dismissModal} />
          <Spacer h={container.bottomModalSafeArea} />
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
