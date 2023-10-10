/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTailwind, useThrottle } from '@hooks';
import { FlashList } from '@shopify/flash-list';
import {
  GetNextPageParamFunction,
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { compareMemo } from '@utils';
import { RefAttributes, forwardRef, useMemo, useState } from 'react';
import { RefreshControlProps, View } from 'react-native';
import ActivityIndicator from '../Loader/ActivityIndicator';
import List, { ListProps } from './List';

interface InfiniteListProps<T = any>
  extends Omit<ListProps<T, true>, keyof RefreshControlProps | 'data' | 'isFlashList'>,
    Partial<RefreshControlProps> {
  queryKey: QueryKey;
  queryFn: QueryFunction<T[]>;
  getNextPageParam?: GetNextPageParamFunction<T[]>;
  ListFetchingComponent?: ListProps<T, true>['ListEmptyComponent'];
  ListErrorComponent?: ListProps<T, true>['ListEmptyComponent'];
}

const _InfiniteList = compareMemo<FlashList<any>, InfiniteListProps>(
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
      const { tw } = useTailwind();
      const [refreshing, setRefreshing] = useState(false);

      const { fetchNextPage, data, isError, hasNextPage, refetch, isLoading } = useInfiniteQuery({
        queryKey,
        queryFn,
        getNextPageParam: getNextPageParam || ((_, allPages) => allPages.length + 1),
      });

      const isFetching = isLoading && !refreshing;

      const FetchingComponent = useMemo(
        () =>
          ListFetchingComponent || (
            <View style={tw`flex-fill-center`}>
              <ActivityIndicator size="large" />
            </View>
          ),
        [ListFetchingComponent, tw],
      );

      const ListFooterComponent = useMemo(
        () => (
          <View style={tw`py-2`}>
            <ActivityIndicator />
          </View>
        ),
        [tw],
      );

      const handleOnRefresh = useThrottle(() => {
        setRefreshing(true);
        refetch().finally(() => setRefreshing(false));
      }, [setRefreshing, refetch]);

      const handleOnEndReached = useThrottle(() => {
        fetchNextPage();
      }, [fetchNextPage]);

      return (
        <List<Awaited<ReturnType<typeof queryFn>>[number], true>
          {...props}
          isFlashList
          data={data?.pages.flat()}
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          ref={ref}
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

const InfiniteList = _InfiniteList as <T = any>(
  props: InfiniteListProps<T> & RefAttributes<FlashList<T>>,
) => JSX.Element;

export default InfiniteList;
