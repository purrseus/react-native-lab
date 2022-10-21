import { BottomSheet, ImagePicker, Text } from '@components/core';
import ActionSheet from '@components/core/BottomSheet/ActionSheet';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { logger, withHook } from '@utilities';
import { Separator, ShowcaseItem } from '../components';
import { useBottomSheetContainer } from '../containers';

const BottomSheets = withHook(
  useBottomSheetContainer,
  ({
    showBottomSheet,
    showActionSheet,
    showImagePicker,
    bottomSheetRef,
    bottomSheetSnapPoints,
    actionSheetRef,
    actionSheetOptions,
    imagePickerRef,
    images,
    setImages,
  }) => {
    const styles = useStyle(createStyles);

    return (
      <>
        <StackContainer
          wrapperType="scrollView"
          headerTitle={ProtectedScreenName.BottomSheets}
          wrapperStyle={styles.scrollView}
        >
          <ShowcaseItem title="Show BottomSheet" onPress={showBottomSheet} />
          <Separator />
          <ShowcaseItem title="Show ActionSheet" onPress={showActionSheet} />
          <Separator />
          <ShowcaseItem title="Show ImagePicker" onPress={showImagePicker} />
        </StackContainer>

        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={bottomSheetSnapPoints}>
          <Text>This is a BottomSheet</Text>
        </BottomSheet>
        <ActionSheet ref={actionSheetRef} options={actionSheetOptions} onSelect={logger} />
        <ImagePicker ref={imagePickerRef} images={images} onChangeImage={setImages} />
      </>
    );
  },
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default BottomSheets;
