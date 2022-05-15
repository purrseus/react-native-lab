/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import { FlatList, FlatListProps, RefreshControlProps, View } from 'react-native';
import BottomTabSpacer from './BottomTabSpacer';
import RefreshControl from './RefreshControl';

export interface ListViewProps<T = any>
  extends Omit<FlatListProps<T>, keyof RefreshControlProps>,
    Partial<RefreshControlProps> {
  isTabScreen?: boolean;
}

function ListViewBase<T>(
  {
    refreshing = false,
    onRefresh,
    ListFooterComponent,
    isTabScreen = false,
    ...props
  }: ListViewProps<T>,
  ref: ForwardedRef<FlatList<T>>,
) {
  const handleKeyExtractor = useCallback((item: Record<string, any>, index: number) => {
    for (const key in item) {
      if (key.match(/id/gi)?.length) return `${item[key]}`;
    }
    return index.toString();
  }, []);

  return (
    <FlatList
      removeClippedSubviews
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      onEndReachedThreshold={0.5}
      scrollEventThrottle={16}
      {...props}
      {...(!!onRefresh && { refreshControl: <RefreshControl {...{ refreshing, onRefresh }} /> })}
      ref={ref}
      keyExtractor={handleKeyExtractor}
      ListFooterComponent={
        <View>
          {ListFooterComponent}
          {isTabScreen && <BottomTabSpacer />}
        </View>
      }
    />
  );
}

const ListView = forwardRef<FlatList, ListViewProps>(ListViewBase);

export default ListView;
