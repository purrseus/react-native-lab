/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { PaginationConfig, StyleCallbackParams } from '@core/interfaces';
import { usePagination, useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { AxiosRequestConfig } from 'axios';
import { throttle } from 'lodash';
import React, { forwardRef, useCallback } from 'react';
import { FlatList, RefreshControlProps, View } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import ListView, { ListViewProps } from './ListView';

interface PaginatorListProps
  extends Omit<ListViewProps, keyof RefreshControlProps | 'data'>,
    Partial<RefreshControlProps> {
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<any>;
  paginationConfig?: PaginationConfig;
}

const PaginatorList = forwardRef<FlatList, PaginatorListProps>(
  ({ requestCallback, paginationConfig, ...props }, ref) => {
    const styles = useStyle(styleCallback);
    const { canLoadMore, fetching, onLoadMore, ...listProps } = usePagination(
      requestCallback,
      paginationConfig,
    );

    const handleOnEndReached = useCallback(
      throttle(onLoadMore, ONE_SECOND, {
        leading: true,
        trailing: true,
      }),
      [onLoadMore],
    );

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

const styleCallback = ({ create }: StyleCallbackParams) =>
  create({
    footer: {
      paddingVertical: 8,
    },
  });

export default PaginatorList;
