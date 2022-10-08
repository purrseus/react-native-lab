import { BottomSheet, ImagePicker, Text } from '@components/core';
import ActionSheet from '@components/core/BottomSheet/ActionSheet';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import { logger } from '@utilities';
import { Separator, ShowcaseItem } from '../components';
import { useBottomSheetContainer } from '../containers';

const BottomSheets: ProtectedScreen<ProtectedScreenName.BottomSheets> = () => {
  const styles = useStyle(createStyles);
  const container = useBottomSheetContainer();

  return (
    <>
      <StackContainer
        wrapperType="scrollView"
        headerTitle={ProtectedScreenName.BottomSheets}
        wrapperStyle={styles.scrollView}
      >
        <ShowcaseItem title="Show BottomSheet" onPress={container.showBottomSheet} />
        <Separator />
        <ShowcaseItem title="Show ActionSheet" onPress={container.showActionSheet} />
        <Separator />
        <ShowcaseItem title="Show ImagePicker" onPress={container.showImagePicker} />
      </StackContainer>

      <BottomSheet
        ref={container.bottomSheetRef}
        index={-1}
        snapPoints={container.bottomSheetSnapPoints}
      >
        <Text>This is a BottomSheet</Text>
      </BottomSheet>
      <ActionSheet
        ref={container.actionSheetRef}
        options={container.actionSheetOptions}
        onSelect={logger}
      />
      <ImagePicker
        ref={container.imagePickerRef}
        images={container.images}
        onChangeImage={container.setImages}
      />
    </>
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default BottomSheets;
