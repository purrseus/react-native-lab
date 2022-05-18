/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationConfig, StyleCallbackParams } from '@core/interfaces';
import { usePagination, useStyle, useThrottle } from '@hooks';
import { globalStyles } from '@themes';
import { AxiosRequestConfig } from 'axios';
import React, { forwardRef } from 'react';
import { FlatList, RefreshControlProps, View } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import ListView, { ListViewProps } from './ListView';

interface InfiniteListProps
  extends Omit<ListViewProps, keyof RefreshControlProps | 'data'>,
    Partial<RefreshControlProps> {
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<any>;
  paginationConfig?: PaginationConfig;
}
// TODO: InfiniteList
const InfiniteList = forwardRef<FlatList, InfiniteListProps>(
  ({ requestCallback, paginationConfig, ...props }, ref) => {
    const styles = useStyle(createStyles);
    const { canLoadMore, fetching, onLoadMore, ...listProps } = usePagination(
      requestCallback,
      paginationConfig,
    );

    const handleOnEndReached = useThrottle(onLoadMore, [onLoadMore]);

    if (fetching)
      return (
        <View style={globalStyles.flexCenter}>
          <ActivityIndicator size="large" />
        </View>
      );

    return (
      <ListView
        ref={ref}
        {...listProps}
        {...props}
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
  },
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    footer: {
      paddingVertical: 8,
    },
  });

export default InfiniteList;
