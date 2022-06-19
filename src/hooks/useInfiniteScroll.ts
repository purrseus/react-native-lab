/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InfiniteScrollConfig,
  PaginationResponse,
  UseInfiniteScrollReturn,
} from '@core/interfaces';
import { deepAccessObject, logger } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

interface InfiniteScrollRef<Params> {
  isFirstCall: boolean;
  paramsRef: Params;
  pageIndex: number;
}

interface InfiniteScroll<Data> {
  fetching: boolean;
  refreshing: boolean;
  canLoadMore: boolean;
  data: Data;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_INDEX_KEY = 'page'; // pageIndex, page,...
const PAGE_SIZE_KEY = 'limit'; // pageSize, perPage, limit,...

const useInfiniteScroll = <T extends PaginationResponse<D>, D extends any[]>(
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<T>,
  {
    pageSize = DEFAULT_PAGE_SIZE,
    params = {},
    accessProperties = ['data'],
  }: InfiniteScrollConfig = {},
): UseInfiniteScrollReturn => {
  const controller = useRef(new AbortController()).current;
  const infiniteScrollRef = useRef<InfiniteScrollRef<InfiniteScrollConfig['params']>>({
    isFirstCall: true,
    paramsRef: params,
    pageIndex: 1,
  }).current;
  const [infiniteScroll, setInfiniteScroll] = useState<InfiniteScroll<D | never[]>>({
    fetching: true,
    refreshing: false,
    canLoadMore: true,
    data: [],
  });

  const setState = useCallback(
    (partialState: Partial<InfiniteScroll<D | never[]>>) =>
      setInfiniteScroll(previousState => ({ ...previousState, ...partialState })),
    [],
  );

  const handleRequest = useCallback(async () => {
    try {
      const response = await requestCallback({
        params: {
          [PAGE_INDEX_KEY]: infiniteScrollRef.pageIndex,
          [PAGE_SIZE_KEY]: pageSize,
          ...infiniteScrollRef.paramsRef,
        },
        signal: controller.signal,
      });

      const responseData = deepAccessObject<T, D>(response, accessProperties);

      if (!Array.isArray(responseData)) return [];
      if (responseData.length < pageSize) setState({ canLoadMore: false });
      if (infiniteScrollRef.isFirstCall) {
        setState({ data: responseData });
      }

      return responseData;
    } catch (error) {
      logger(error);
    } finally {
      setState({ fetching: false });
      infiniteScrollRef.isFirstCall = false;
    }
  }, [setState, accessProperties, controller.signal, pageSize, requestCallback]);

  const onRefresh = useCallback(async () => {
    try {
      infiniteScrollRef.pageIndex = 1;
      setState({ canLoadMore: true, refreshing: true });
      const responseData = await handleRequest();
      if (Array.isArray(responseData)) {
        setState({ data: responseData });
      }
    } catch (error) {
      logger(error);
    } finally {
      setState({ refreshing: false });
    }
  }, [handleRequest, setState]);

  const onLoadMore = useCallback(async () => {
    if (!infiniteScroll.canLoadMore) return;
    try {
      infiniteScrollRef.pageIndex += 1;
      const responseData = await handleRequest();
      if (Array.isArray(responseData)) {
        setInfiniteScroll(previousState => ({
          ...previousState,
          data: [...previousState.data, ...responseData] as D,
        }));
      }
    } catch (error) {
      logger(error);
    }
  }, [handleRequest, infiniteScroll.canLoadMore]);

  const cancelRequest = useCallback(() => controller.abort(), []);

  useEffect(() => {
    handleRequest();

    return cancelRequest;
  }, []);

  useEffect(() => {
    if (!infiniteScrollRef.isFirstCall && !isEqual(params, infiniteScrollRef.paramsRef)) {
      infiniteScrollRef.paramsRef = params;
      onRefresh();
    }
  }, [params, onRefresh]);

  return {
    ...infiniteScroll,
    onRefresh,
    onLoadMore,
  };
};

export default useInfiniteScroll;
