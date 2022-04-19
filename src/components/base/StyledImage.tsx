import { CommonSize, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { logger, resizeImage } from '@utilities';
import React, { useCallback, useState } from 'react';
import {
  AccessibilityProps,
  Image,
  ImageLoadEventData,
  ImageProps,
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

type RewrittenImagePropKeys =
  | 'source'
  | 'resizeMode'
  | 'onLoadStart'
  | 'onLoad'
  | 'onError'
  | 'onLoadEnd'
  | 'style';

type OnlyFastImagePropKeys = 'fallback' | 'tintColor';

type ImageURI<C> = C extends true ? Source : ImageURISource;

type RewrittenImageProps<C, Key extends keyof FastImageProps & keyof ImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : ImageProps[K];
};

type OnlyFastImageProps<C, Key extends keyof FastImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : undefined;
};

type RewrittenProps<C> = Partial<
  RewrittenImageProps<C, RewrittenImagePropKeys> & OnlyFastImageProps<C, OnlyFastImagePropKeys>
> &
  RewrittenImageProps<C, 'source'>;

interface StyledImageProps<C extends boolean>
  extends Omit<ImageProps, keyof FastImageProps>,
    AccessibilityProps,
    ViewProps {
  fullSize?: boolean;
  expectWidth?: number;
  expectHeight?: number;
  cached?: C;
}

export type RewrittenStyledImageProps<C extends boolean> = StyledImageProps<C> & RewrittenProps<C>;

function StyledImage<C extends boolean = false>({
  style,
  expectWidth,
  expectHeight,
  fullSize = false,
  cached,
  onLoad,
  ...props
}: RewrittenStyledImageProps<C>) {
  const fixedSize = typeof expectWidth === 'number' && typeof expectHeight === 'number';
  const sourceImage =
    typeof props.source === 'number' ? props.source : { uri: (props.source as ImageURI<C>).uri };
  const { uri: imageURI } = Image.resolveAssetSource(sourceImage);

  const styles = useStyle(styleCallback);
  const [imageSize, setImageSize] = useState<CommonSize>({
    width: 1,
    height: 1,
  });

  const createImageStyle = useCallback(
    function <T>() {
      return [
        fixedSize ? { width: expectWidth, height: expectHeight } : imageSize,
        styles.image,
        style as T,
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
      Image.getSize(
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
    <Image
      {...(props as ImageProps)}
      onLoad={handleOnLoad as ImageProps['onLoad']}
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

export default StyledImage;
