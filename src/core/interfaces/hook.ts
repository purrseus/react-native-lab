/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListViewProps } from '@components/core/ListView';
import { darkTheme, lightTheme } from '@themes';
import { ScaledSize, StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export interface StyleCallbackParams {
  dimensions: ScaledSize;
  colors: typeof darkTheme & typeof lightTheme;
  edgeInsets: EdgeInsets;
  create: typeof StyleSheet.create;
}

export interface PaginationConfig {
  pageSize?: number;
  params?: Record<string, any>;
  accessProperties?: string[];
}

export interface UsePaginationReturn
  extends Pick<ListViewProps, 'data' | 'refreshing' | 'onRefresh'> {
  fetching: boolean;
  canLoadMore: boolean;
  onLoadMore: () => Promise<void>;
}
