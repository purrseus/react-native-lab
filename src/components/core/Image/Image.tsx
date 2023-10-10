import { CommonSize } from '@core/types';
import { useTailwind } from '@hooks';
import { compareMemo } from '@utils';
import { omit } from 'lodash';
import { useCallback, useState } from 'react';
import {
  AccessibilityProps,
  ImageLoadEventData,
  NativeSyntheticEvent,
  Image as RNImage,
  ImageProps as RNImageProps,
  ViewProps,
} from 'react-native';
import FastImage, { FastImageProps, OnLoadEvent } from 'react-native-fast-image';
import { Style } from 'twrnc/dist/esm/types';

type MixinImagePropKeys =
  | 'source'
  | 'resizeMode'
  | 'onLoadStart'
  | 'onLoad'
  | 'onError'
  | 'onLoadEnd';

type CachedImagePropKeys = 'fallback' | 'tintColor';

type ImageTypeProps<C, Key extends keyof FastImageProps & keyof RNImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : RNImageProps[K];
};

type CachedImageProps<C, Key extends keyof FastImageProps> = {
  [K in Key]: C extends true ? FastImageProps[K] : undefined;
};

type MixinImageProps<C> = Partial<
  ImageTypeProps<C, MixinImagePropKeys> & CachedImageProps<C, CachedImagePropKeys>
> &
  ImageTypeProps<C, 'source'>;

interface CommonImageProps<C extends boolean>
  extends Omit<RNImageProps, keyof FastImageProps>,
    AccessibilityProps,
    ViewProps {
  cached?: C;
  style?: Style;
}

export type ImageProps<C extends boolean = false> = CommonImageProps<C> & MixinImageProps<C>;

const _Image = compareMemo<ImageProps>(({ style, cached, onLoad, ...props }) => {
  const { tw } = useTailwind();
  const [size, setSize] = useState<CommonSize>({ width: 0, height: 0 });
  const hasSizes = !!size.width && !!size.height;
  const imageStyle = tw.style(hasSizes ? 'bg-transparent' : 'bg-zinc-300 dark:bg-zinc-700', style);

  const handleOnLoad = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<ImageLoadEventData> | OnLoadEvent) => {
      onLoad?.({ nativeEvent } as Parameters<NonNullable<ImageProps['onLoad']>>[0]);

      if (hasSizes) return;
      setSize('source' in nativeEvent ? omit(nativeEvent.source, ['uri']) : nativeEvent);
    },
    [hasSizes, onLoad],
  );

  return cached ? (
    <FastImage {...(props as FastImageProps)} onLoad={handleOnLoad} style={imageStyle} />
  ) : (
    <RNImage
      {...(props as RNImageProps)}
      onLoad={handleOnLoad}
      progressiveRenderingEnabled
      style={imageStyle}
    />
  );
});

const Image = _Image as <T extends boolean = false>(props: ImageProps<T>) => JSX.Element;

export default Image;
