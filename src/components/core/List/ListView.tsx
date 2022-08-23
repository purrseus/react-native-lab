/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareMemo } from '@utilities';
import React, { ForwardedRef, forwardRef, RefAttributes, useCallback, useRef } from 'react';
import { FlatList, FlatListProps, RefreshControlProps } from 'react-native';
import BottomTabSpacer from '../Spacer/BottomTabSpacer';
import RefreshControl from '../Loader/RefreshControl';

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
  const keyRef = useRef<string | undefined>();

  const handleKeyExtractor = useCallback((item: Record<string, any>, index: number) => {
    if (keyRef.current) {
      return item[keyRef.current];
    }

    if (keyRef.current === undefined) {
      for (const key in item) {
        if (key.match(/id/gi)?.length) {
          keyRef.current = key;
          return `${item[key]}`;
        }
      }
    }

    if (keyRef.current === undefined) keyRef.current = '';
    return `${index}`;
  }, []);

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
