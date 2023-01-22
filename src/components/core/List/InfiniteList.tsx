/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle, useThrottle } from '@hooks';
import {
  QueryKey,
  QueryFunction,
  GetNextPageParamFunction,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import { forwardRef, RefAttributes, useMemo, useState } from 'react';
import { FlatList, RefreshControlProps, View } from 'react-native';
import ActivityIndicator from '../Loader/ActivityIndicator';
import List, { ListProps } from './List';

interface InfiniteListProps<T = any>
  extends Omit<ListProps<T>, keyof RefreshControlProps | 'data'>,
    Partial<RefreshControlProps> {
  queryKey: QueryKey;
  queryFn: QueryFunction<T[]>;
  getNextPageParam?: GetNextPageParamFunction<T[]>;
  ListFetchingComponent?: ListProps<T>['ListEmptyComponent'];
  ListErrorComponent?: ListProps<T>['ListEmptyComponent'];
}

const _InfiniteList = compareMemo<FlatList, InfiniteListProps>(
  forwardRef(
    (
      {
        queryKey,
        queryFn,
        getNextPageParam,
        ListFetchingComponent,
        ListErrorComponent,
        ListEmptyComponent,
        ...props
      },
      ref,
    ) => {
      const styles = useStyle(createStyles);
      const [refreshing, setRefreshing] = useState(false);

      const { fetchNextPage, data, isError, hasNextPage, refetch, isLoading } = useInfiniteQuery({
        queryKey,
        queryFn,
        getNextPageParam: getNextPageParam || ((_, allPages) => allPages.length + 1),
      });

      const isFetching = isLoading && !refreshing;

      const contentContainerStyle = isFetching
        ? globalStyles.flexFill
        : props.contentContainerStyle;

      const FetchingComponent = useMemo(
        () =>
          ListFetchingComponent || (
            <View style={globalStyles.flexFillCenter}>
              <ActivityIndicator size="large" />
            </View>
          ),
        [ListFetchingComponent],
      );

      const ListFooterComponent = useMemo(
        () => (
          <View style={styles.footer}>
            <ActivityIndicator />
          </View>
        ),
        [styles.footer],
      );

      const handleOnRefresh = useThrottle(() => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
      }, [setRefreshing, refetch]);

      const handleOnEndReached = useThrottle(() => fetchNextPage(), [fetchNextPage]);

      return (
        <List
          {...props}
          data={data?.pages.flat()}
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          ref={ref}
          contentContainerStyle={contentContainerStyle}
          onEndReached={handleOnEndReached}
          ListEmptyComponent={
            isError ? ListErrorComponent : isFetching ? FetchingComponent : ListEmptyComponent
          }
          {...(hasNextPage && { ListFooterComponent })}
        />
      );
    },
  ),
);

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    footer: {
      paddingVertical: 8,
    },
  });

const InfiniteList = _InfiniteList as <T = any>(
  props: InfiniteListProps<T> & RefAttributes<FlatList<T>>,
) => JSX.Element;

export default InfiniteList;
