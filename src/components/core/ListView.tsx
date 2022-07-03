/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareMemo } from '@utilities';
import React, { ForwardedRef, forwardRef, RefAttributes } from 'react';
import { FlatList, FlatListProps, RefreshControlProps } from 'react-native';
import BottomTabSpacer from './BottomTabSpacer';
import RefreshControl from './RefreshControl';

export interface ListViewProps<T = any>
  extends Omit<FlatListProps<T>, keyof RefreshControlProps>,
    Partial<RefreshControlProps> {
  isTabScreen?: boolean;
}

const _ListView = (
  {
    refreshing = false,
    onRefresh,
    ListFooterComponent,
    isTabScreen = false,
    ...props
  }: ListViewProps,
  ref: ForwardedRef<FlatList>,
) => {
  const handleKeyExtractor = (item: Record<string, any>, index: number) => {
    for (const key in item) {
      if (key.match(/id/gi)?.length) return `${item[key]}`;
    }
    return `${index}`;
  };

  return (
    <FlatList
      removeClippedSubviews
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onEndReachedThreshold={0.5}
      scrollEventThrottle={16}
      {...props}
      {...(!!onRefresh && {
        refreshControl: <RefreshControl {...{ refreshing, onRefresh }} />,
      })}
      ref={ref}
      keyExtractor={handleKeyExtractor}
      ListFooterComponent={
        <>
          {ListFooterComponent}
          {isTabScreen && <BottomTabSpacer />}
        </>
      }
    />
  );
};

const ListView = compareMemo<FlatList, ListViewProps>(forwardRef(_ListView)) as <T = any>(
  props: ListViewProps<T> & RefAttributes<FlatList<T>>,
) => JSX.Element;

export default ListView;
