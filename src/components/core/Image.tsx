import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import React from 'react';
import {
  AccessibilityProps,
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageStyle,
  StyleProp,
  ViewProps,
} from 'react-native';
import FastImage, { FastImageProps, ImageStyle as FastImageStyle } from 'react-native-fast-image';

type CombinedImagePropKeys =
  | 'source'
  | 'resizeMode'
  | 'onLoadStart'
  | 'onLoad'
  | 'onError'
  | 'onLoadEnd'
  | 'style';

type CachedImagePropKeys = 'fallback' | 'tintColor';

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
  cached?: C;
}

export type ImageProps<C extends boolean> = CommonImageProps<C> & AdditionalImageProps<C>;

function Image<C extends boolean = false>({ style, cached, ...props }: ImageProps<C>) {
  const isLocalImage = typeof props.source === 'number';
  const styles = useStyle(createStyles);

  return cached || isLocalImage ? (
    <FastImage
      {...(props as FastImageProps)}
      style={[styles.image, style as StyleProp<FastImageStyle>]}
    />
  ) : (
    <RNImage
      {...(props as RNImageProps)}
      progressiveRenderingEnabled
      style={[styles.image, style as StyleProp<ImageStyle>]}
    />
  );
}

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    image: {
      backgroundColor: colors.backgroundImage,
    },
  });

export default Image;
