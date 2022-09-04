import { BottomSheet, ImagePicker, Text } from '@components/core';
import ActionSheet from '@components/core/BottomSheet/ActionSheet';
import { StackContainer } from '@components/custom';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { logger } from '@utilities';
import React from 'react';
import { ShowcaseItem } from '../components';
import useBottomSheetContainer from '../containers/useBottomSheetContainer';

const BottomSheets = () => {
  const styles = useStyle(createStyles);
  const { bottomSheetRef, actionSheetRef, imagePickerRef, images, setImages, Separator } =
    useBottomSheetContainer();

  return (
    <>
      <StackContainer
        wrapperType="scrollView"
        headerTitle="BottomSheet"
        wrapperStyle={styles.scrollView}
      >
        <ShowcaseItem
          title="Show BottomSheet"
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        />
        <Separator />
        <ShowcaseItem title="Show ActionSheet" onPress={() => actionSheetRef.current?.show()} />
        <Separator />
        <ShowcaseItem title="Show ImagePicker" onPress={() => imagePickerRef.current?.pick()} />
      </StackContainer>

      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['30%', '60%', '100%']}>
        <Text>This is a BottomSheet</Text>
      </BottomSheet>
      <ActionSheet
        ref={actionSheetRef}
        options={['Cancel', 'Option 1', 'Option 2']}
        onSelect={logger}
      />
      <ImagePicker ref={imagePickerRef} images={images} onChangeImage={setImages} />
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
