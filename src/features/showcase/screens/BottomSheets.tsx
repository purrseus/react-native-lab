import { Alert, BottomSheet, Divider, ImagePicker, Spacer, Text } from '@components/core';
import ActionSheet, { ActionSheetMethods } from '@components/core/BottomSheet/ActionSheet';
import { Image, ImagePickerMethods } from '@components/core/BottomSheet/ImagePicker';
import { StackContainer } from '@components/custom';
import { I18nText } from '@core/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useStyle } from '@hooks';
import { logger, referenceTypeFormatter } from '@utilities';
import React, { useEffect, useRef, useState } from 'react';
import { ShowcaseItem } from '../components';
import { createBottomSheetsStyles } from '../styles';

const BottomSheets = () => {
  const styles = useStyle(createBottomSheetsStyles);
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const actionSheetRef = useRef<ActionSheetMethods | null>(null);
  const imagePickerRef = useRef<ImagePickerMethods | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (images.length) Alert(referenceTypeFormatter(images) as I18nText);
  }, [images]);

  return (
    <>
      <StackContainer
        wrapperType="scrollView"
        headerTitle={'BottomSheet' as I18nText}
        wrapperStyle={styles.scrollView}
      >
        <ShowcaseItem
          title="Show BottomSheet"
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        />

        <Spacer h={16} />
        <Divider />
        <Spacer h={16} />

        <ShowcaseItem title="Show ActionSheet" onPress={() => actionSheetRef.current?.show()} />

        <Spacer h={16} />
        <Divider />
        <Spacer h={16} />

        <ShowcaseItem title="Show ImagePicker" onPress={() => imagePickerRef.current?.pick()} />
      </StackContainer>

      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={['30%', '60%', '100%']}>
        <Text>This is a BottomSheet</Text>
      </BottomSheet>

      <ActionSheet
        ref={actionSheetRef}
        options={['Cancel', 'Hello', 'World'] as unknown as I18nText[]}
        onSelect={logger}
      />

      <ImagePicker ref={imagePickerRef} images={images} onChangeImage={setImages} />
    </>
  );
};

export default BottomSheets;
