import { CommonSize, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { logger, resizeImage } from '@utilities';
import React, { useCallback, useState } from 'react';
import {
  AccessibilityProps,
  Image as RNImage,
  ImageLoadEventData,
  ImageProps as RNImageProps,
  ImageStyle,
  ImageURISource,
  NativeSyntheticEvent,
  StyleProp,
  ViewProps,
} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle as FastImageStyle,
  OnLoadEvent,
  Source,
} from 'react-native-fast-image';

type CombinedImagePropKeys =
  | 'source'
  | 'resizeMode'
  | 'onLoadStart'
  | 'onLoad'
  | 'onError'
  | 'onLoadEnd'
  | 'style';

type CachedImagePropKeys = 'fallback' | 'tintColor';

type ImageURI<C> = C extends true ? Source : ImageURISource;

type CombinedImageProps<C, Key extends keyof FastImageProps & keyof RNImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : RNImageProps[K];
};

type CachedImageProps<C, Key extends keyof FastImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : undefined;
};

type AdditionalImageProps<C> = Partial<
  CombinedImageProps<C, CombinedImagePropKeys> & CachedImageProps<C, CachedImagePropKeys>
> &
  CombinedImageProps<C, 'source'>;

interface CommonImageProps<C extends boolean>
  extends Omit<RNImageProps, keyof FastImageProps>,
    AccessibilityProps,
    ViewProps {
  fullSize?: boolean;
  expectWidth?: number;
  expectHeight?: number;
  cached?: C;
}

export type ImageProps<C extends boolean> = CommonImageProps<C> & AdditionalImageProps<C>;

function Image<C extends boolean = false>({
  style,
  expectWidth,
  expectHeight,
  fullSize = false,
  cached,
  onLoad,
  ...props
}: ImageProps<C>) {
  const fixedSize = typeof expectWidth === 'number' && typeof expectHeight === 'number';
  const sourceImage =
    typeof props.source === 'number' ? props.source : { uri: (props.source as ImageURI<C>).uri };
  const { uri: imageURI } = RNImage.resolveAssetSource(sourceImage);

  const styles = useStyle(styleCallback);
  const [imageSize, setImageSize] = useState<CommonSize>({
    width: 1,
    height: 1,
  });

  const createImageStyle = useCallback(
    function <T>() {
      return [
        styles.image,
        style as T,
        fixedSize ? { width: expectWidth, height: expectHeight } : imageSize,
      ];
    },
    [expectWidth, expectHeight, fixedSize, imageSize, style, styles.image],
  );

  const createDynamicSize = useCallback(
    (width: number, height: number) =>
      fullSize
        ? { width, height }
        : resizeImage(
            typeof expectWidth === 'number' ? 'width' : 'height',
            expectWidth || expectHeight || 1,
            width,
            height,
          ),
    [expectWidth, expectHeight, fullSize],
  );

  const handleOnLoad = useCallback(
    (event: OnLoadEvent | NativeSyntheticEvent<ImageLoadEventData>) => {
      onLoad?.(event as OnLoadEvent & NativeSyntheticEvent<ImageLoadEventData>);
      if (fixedSize) return;
      RNImage.getSize(
        imageURI,
        (width, height) => setImageSize(createDynamicSize(width, height)),
        logger,
      );
    },
    [imageURI, fixedSize, createDynamicSize, onLoad],
  );

  return cached ? (
    <FastImage
      {...(props as FastImageProps)}
      onLoad={handleOnLoad as FastImageProps['onLoad']}
      style={createImageStyle<StyleProp<FastImageStyle>>()}
    />
  ) : (
    <RNImage
      {...(props as RNImageProps)}
      onLoad={handleOnLoad as RNImageProps['onLoad']}
      progressiveRenderingEnabled
      style={createImageStyle<StyleProp<ImageStyle>>()}
    />
  );
}

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    image: {
      backgroundColor: colors.backgroundImage,
    },
  });

export default Image;
