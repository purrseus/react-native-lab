/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareMemo } from '@utilities';
import React, { forwardRef } from 'react';
import { FlatList, FlatListProps, RefreshControlProps } from 'react-native';
import BottomTabSpacer from './BottomTabSpacer';
import RefreshControl from './RefreshControl';

export interface ListViewProps<T = any>
  extends Omit<FlatListProps<T>, keyof RefreshControlProps>,
    Partial<RefreshControlProps> {
  isTabScreen?: boolean;
}

const ListView = compareMemo<FlatList, ListViewProps>(
  forwardRef(
    (
      { refreshing = false, onRefresh, ListFooterComponent, isTabScreen = false, ...props },
      ref,
    ) => {
      const handleKeyExtractor = (item: Record<string, any>, index: number) => {
        for (const key in item) {
          if (key.match(/id/gi)?.length) return `${item[key]}`;
        }
        return index.toString();
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
    },
  ),
);

export default ListView;
