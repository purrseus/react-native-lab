import { Alert } from '@components/core';
import { ActionSheetMethods, ImagePickerMethods } from '@core/interfaces';
import { PickedImageType } from '@core/types';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { referenceTypeFormatter } from '@utilities';
import { useEffect, useRef, useState } from 'react';

const useBottomSheetContainer = () => {
  const bottomSheetSnapPoints = ['30%', '60%', '100%'];
  const actionSheetOptions = ['Cancel', 'Option 1', 'Option 2'];

  const [images, setImages] = useState<PickedImageType[]>([]);
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const actionSheetRef = useRef<ActionSheetMethods | null>(null);
  const imagePickerRef = useRef<ImagePickerMethods | null>(null);

  useEffect(() => {
    if (images.length)
      Alert(referenceTypeFormatter(typeof images[0] !== 'string' ? images[0].uri : images[0]));
  }, [images]);

  const showBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);
  const showActionSheet = () => actionSheetRef.current?.show();
  const showImagePicker = () => imagePickerRef.current?.pick();

  return {
    bottomSheetRef,
    actionSheetRef,
    imagePickerRef,
    images,
    setImages,
    showBottomSheet,
    showActionSheet,
    showImagePicker,
    bottomSheetSnapPoints,
    actionSheetOptions,
  };
};

export default useBottomSheetContainer;
