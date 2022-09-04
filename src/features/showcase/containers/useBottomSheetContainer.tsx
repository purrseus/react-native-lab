import { Alert, Divider, Spacer } from '@components/core';
import { ActionSheetMethods } from '@components/core/BottomSheet/ActionSheet';
import { Image, ImagePickerMethods } from '@components/core/BottomSheet/ImagePicker';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { referenceTypeFormatter } from '@utilities';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const useBottomSheetContainer = () => {
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const actionSheetRef = useRef<ActionSheetMethods | null>(null);
  const imagePickerRef = useRef<ImagePickerMethods | null>(null);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    if (images.length)
      Alert(referenceTypeFormatter(typeof images[0] !== 'string' ? images[0].uri : images[0]));
  }, [images]);

  const Separator = useCallback(
    () => (
      <>
        <Spacer h={16} />
        <Divider />
        <Spacer h={16} />
      </>
    ),
    [],
  );

  return { bottomSheetRef, actionSheetRef, imagePickerRef, images, setImages, Separator };
};

export default useBottomSheetContainer;
