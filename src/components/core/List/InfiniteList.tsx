/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteScrollConfig, StyleCallbackParams } from '@core/interfaces';
import { useInfiniteScroll, useStyle, useThrottle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import React, { ForwardedRef, forwardRef, RefAttributes } from 'react';
import { FlatList, RefreshControlProps, View } from 'react-native';
import ActivityIndicator from '../Loader/ActivityIndicator';
import ListView, { ListViewProps } from './ListView';

interface InfiniteListProps<T = any>
  extends Omit<ListViewProps<T>, keyof RefreshControlProps | 'data'>,
    Partial<RefreshControlProps> {
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<any>;
  config?: InfiniteScrollConfig;
}

const _InfiniteList = (
  { requestCallback, config, ...props }: InfiniteListProps,
  ref: ForwardedRef<FlatList>,
) => {
  const styles = useStyle(createStyles);
  const { canLoadMore, fetching, onLoadMore, ...listProps } = useInfiniteScroll(
    requestCallback,
    config,
  );

  const handleOnEndReached = useThrottle(onLoadMore, [onLoadMore]);

  if (fetching)
    return (
      <View style={globalStyles.flexFillCenter}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <ListView
      ref={ref}
      {...props}
      {...listProps}
      onEndReached={handleOnEndReached}
      {...(canLoadMore && {
        ListFooterComponent: (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ),
      })}
    />
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    footer: {
      paddingVertical: 8,
    },
  });

const InfiniteList = compareMemo<FlatList, InfiniteListProps>(forwardRef(_InfiniteList)) as <
  T = any,
>(
  props: InfiniteListProps<T> & RefAttributes<FlatList<T>>,
) => JSX.Element;

export default InfiniteList;
