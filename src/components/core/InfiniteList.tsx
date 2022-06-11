/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteScrollConfig, StyleCallbackParams } from '@core/interfaces';
import { useInfiniteScroll, useStyle, useThrottle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import React, { forwardRef } from 'react';
import { FlatList, RefreshControlProps, View } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import ListView, { ListViewProps } from './ListView';

interface InfiniteListProps
  extends Omit<ListViewProps, keyof RefreshControlProps | 'data'>,
    Partial<RefreshControlProps> {
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<any>;
  config?: InfiniteScrollConfig;
}

const InfiniteList = compareMemo(
  forwardRef<FlatList, InfiniteListProps>(({ requestCallback, config, ...props }, ref) => {
    const styles = useStyle(createStyles);
    const { canLoadMore, fetching, onLoadMore, ...listProps } = useInfiniteScroll(
      requestCallback,
      config,
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
  }),
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    footer: {
      paddingVertical: 8,
    },
  });

export default InfiniteList;
