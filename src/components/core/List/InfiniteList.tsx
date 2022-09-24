/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteScrollConfig, StyleCallbackParams } from '@core/interfaces';
import { useInfiniteScroll, useStyle, useThrottle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import React, { ForwardedRef, forwardRef, RefAttributes, useMemo } from 'react';
import { FlatList, RefreshControlProps, View } from 'react-native';
import ActivityIndicator from '../Loader/ActivityIndicator';
import List, { ListProps } from './List';

interface InfiniteListProps<T = any>
  extends Omit<ListProps<T>, keyof RefreshControlProps | 'data'>,
    Partial<RefreshControlProps> {
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<any>;
  config?: InfiniteScrollConfig;
}

const _InfiniteList = (
  { requestCallback, config, ListEmptyComponent, ...props }: InfiniteListProps,
  ref: ForwardedRef<FlatList>,
) => {
  const styles = useStyle(createStyles);

  const { canLoadMore, fetching, onLoadMore, ...listProps } = useInfiniteScroll(
    requestCallback,
    config,
  );

  const shouldShowFooter = canLoadMore && !listProps.refreshing && !fetching;
  const contentContainerStyle = fetching ? globalStyles.flexFill : props.contentContainerStyle;

  const EmptyComponent = useMemo(
    () =>
      fetching ? (
        <View style={globalStyles.flexFillCenter}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        ListEmptyComponent
      ),
    [fetching, ListEmptyComponent],
  );

  const ListFooterComponent = useMemo(
    () => (
      <View style={styles.footer}>
        <ActivityIndicator />
      </View>
    ),
    [styles.footer],
  );

  const handleOnEndReached = useThrottle(onLoadMore, [onLoadMore]);

  return (
    <List
      {...props}
      {...listProps}
      ref={ref}
      contentContainerStyle={contentContainerStyle}
      onEndReached={handleOnEndReached}
      ListEmptyComponent={EmptyComponent}
      {...(shouldShowFooter && { ListFooterComponent })}
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
