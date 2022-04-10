import { CommonSize, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { resizeImage } from '@utilities';
import React, { useCallback, useState } from 'react';
import {
  AccessibilityProps,
  Image,
  ImageLoadEventData,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  NativeSyntheticEvent,
  StyleProp,
  ViewProps,
} from 'react-native';
import FastImage, {
  FastImageProps,
  OnLoadEvent,
  ResizeMode,
  Source,
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image';

type ImageURI<T> = T extends true ? Source : ImageURISource;
type ImageProp<T, K extends keyof FastImageProps & keyof ImageProps> = T extends true
  ? FastImageProps[K]
  : ImageProps[K];
type OnlyFastImageProp<T, K extends keyof FastImageProps> = T extends true
  ? FastImageProps[K]
  : undefined;

export interface StyledImageProps<T extends boolean>
  extends Omit<ImageProps, keyof FastImageProps>,
    AccessibilityProps,
    ViewProps {
  fullSize?: boolean;
  expectWidth?: number;
  expectHeight?: number;
  cached?: T;
  source: ImageProp<T, 'source'>;
  resizeMode?: ImageProp<T, 'resizeMode'>;
  onLoadStart?: ImageProp<T, 'onLoadStart'>;
  onLoad?: ImageProp<T, 'onLoad'>;
  onError?: ImageProp<T, 'onError'>;
  onLoadEnd?: ImageProp<T, 'onLoadEnd'>;
  style?: ImageProp<T, 'style'>;
  fallback?: OnlyFastImageProp<T, 'fallback'>;
  tintColor?: OnlyFastImageProp<T, 'tintColor'>;
}

function StyledImage<T extends boolean = false>({
  style,
  expectWidth,
  expectHeight,
  fullSize = false,
  cached,
  source,
  resizeMode,
  onLoad,
  ...props
}: StyledImageProps<T>) {
  const fixedSize = typeof expectWidth === 'number' && typeof expectHeight === 'number';
  const sourceImage = typeof source === 'number' ? source : { uri: (source as ImageURI<T>).uri };
  const { uri: imageURI } = Image.resolveAssetSource(sourceImage);

  const styles = useStyle(styleCallback);
  const [imageSize, setImageSize] = useState<CommonSize>({
    width: 1,
    height: 1,
  });

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
      Image.getSize(imageURI, (width, height) => setImageSize(createDynamicSize(width, height))); // TODO: logger
    },
    [imageURI, fixedSize, createDynamicSize, onLoad],
  );

  return cached ? (
    <FastImage
      {...(props as FastImageProps)}
      source={source as FastImageProps['source']}
      resizeMode={resizeMode as ResizeMode}
      onLoad={handleOnLoad as FastImageProps['onLoad']}
      style={[
        fixedSize ? { width: expectWidth, height: expectHeight } : imageSize,
        styles.image,
        style as StyleProp<FastImageStyle>,
      ]}
    />
  ) : (
    <Image
      onLoad={handleOnLoad as ImageProps['onLoad']}
      progressiveRenderingEnabled
      source={source as ImageSourcePropType}
      resizeMode={resizeMode as ImageResizeMode}
      {...props}
      style={[
        fixedSize ? { width: expectWidth, height: expectHeight } : imageSize,
        styles.image,
        style as StyleProp<ImageStyle>,
      ]}
    />
  );
}

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    image: {
      backgroundColor: colors.backgroundImage,
    },
  });

export default StyledImage;
