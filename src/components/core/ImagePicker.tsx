import { File } from '@core/interfaces';
import { I18nText } from '@core/types';
import {
  checkCameraPermission,
  checkPhotoGalleryPermissions,
  compareMemo,
  logger,
} from '@utilities';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ActionSheet, { ActionSheetProps, ActionSheetMethods } from './ActionSheet';

export type Image = string | File;
type PickType = 'pick' | 'replace';

export interface ImagePickerMethods {
  pick: () => void;
  replace: (replaceIndex: number) => void;
  delete: (deleteIndex?: number) => void;
}

interface ImagePickerProps extends Omit<ActionSheetProps, 'onSelect' | 'options'> {
  images: Image[];
  onChangeImage: (images: Image[]) => void;
  maximumImages?: number;
  cameraOptions?: CameraOptions;
  imageLibraryOptions?: ImageLibraryOptions;
}

enum PickerOptions {
  CAMERA = 1,
  IMAGE_LIBRARY = 2,
}

const DEFAULT_MAXIMUM_IMAGES = 10;
const DEFAULT_OPTIONS: I18nText[] = [
  'common.cancel',
  'imagePicker.takePhoto',
  'imagePicker.chooseFromLibrary',
];
const CAMERA_OPTIONS: CameraOptions & ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
  cameraType: 'back',
  includeExtra: true,
  saveToPhotos: true,
};

const selectOptions = {
  [PickerOptions.CAMERA]: launchCamera,
  [PickerOptions.IMAGE_LIBRARY]: launchImageLibrary,
};

const ImagePicker = compareMemo<ImagePickerMethods, ImagePickerProps>(
  forwardRef(
    (
      {
        images,
        onChangeImage,
        cameraOptions = {},
        imageLibraryOptions = {},
        maximumImages = DEFAULT_MAXIMUM_IMAGES,
        ...props
      },
      ref,
    ) => {
      const pickType = useRef<PickType | null>(null);
      const replaceIndex = useRef<number>(-1);
      const actionSheetRef = useRef<ActionSheetMethods | null>(null);

      const resetValue = () => {
        pickType.current = null;
        replaceIndex.current = -1;
      };

      const onSelect = useCallback(
        async (buttonIndex: 0 | PickerOptions) => {
          if (
            !buttonIndex ||
            (pickType.current === 'replace' && replaceIndex.current < 0) ||
            !pickType.current
          ) {
            resetValue();
            return;
          }

          const options = {
            ...CAMERA_OPTIONS,
            ...(buttonIndex === PickerOptions.CAMERA ? cameraOptions : imageLibraryOptions),
          };

          try {
            const result = await selectOptions[buttonIndex](options);
            if (!result?.assets?.length) {
              throw result;
            } else {
              const [{ uri, fileName: name, type }] = result.assets;
              if (!uri || !type || !name) throw '';

              const image: File = { uri, type, name };

              switch (pickType.current) {
                case 'pick':
                  onChangeImage([...images, image]);
                  break;

                case 'replace':
                  const clonedImages = [...images];
                  clonedImages[replaceIndex.current] = image;
                  onChangeImage(clonedImages);
                  break;
              }
            }
          } catch (error) {
            logger(error);
          } finally {
            resetValue();
          }
        },
        [cameraOptions, imageLibraryOptions, images, onChangeImage],
      );

      const pickImage = useCallback(
        (type: PickType) => async (index?: number) => {
          const hasCameraPermission = await checkCameraPermission();
          if (!hasCameraPermission) return;

          const hasGalleryPermission = await checkPhotoGalleryPermissions();
          if (!hasGalleryPermission) return;

          const canNotPick = type === 'pick' && images.length >= maximumImages;
          const canNotReplace =
            (type === 'replace' && !images.length) || (type === 'replace' && index === undefined);
          if (canNotReplace || canNotPick) return;

          pickType.current = type;
          if (type === 'replace' && index !== undefined && index >= 0 && index < images.length)
            replaceIndex.current = index;

          actionSheetRef.current?.show();
        },
        [images, maximumImages],
      );

      const deleteImage = useCallback(
        (deleteIndex?: number) => {
          if (deleteIndex === undefined) {
            onChangeImage([]);
            return;
          }

          const canDeleteImage = !!images.length && deleteIndex >= 0 && deleteIndex < images.length;
          if (canDeleteImage) onChangeImage(images.filter((_, index) => index !== deleteIndex));
        },
        [images, onChangeImage],
      );

      useImperativeHandle(
        ref,
        () => ({
          pick: pickImage('pick'),
          replace: pickImage('replace'),
          delete: deleteImage,
        }),
        [pickImage, deleteImage],
      );

      return (
        <ActionSheet
          {...props}
          ref={actionSheetRef}
          options={DEFAULT_OPTIONS}
          onSelect={onSelect as (buttonIndex: number) => void}
        />
      );
    },
  ),
);

export default ImagePicker;
