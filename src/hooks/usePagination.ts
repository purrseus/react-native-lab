/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationConfig, PaginationResponse, UsePaginationReturn } from '@core/interfaces';
import { deepAccessObject, logger } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

interface PaginationRef<Params> {
  isFirstCall: boolean;
  paramsRef: Params;
  pageIndex: number;
}

interface Pagination<Data> {
  fetching: boolean;
  refreshing: boolean;
  canLoadMore: boolean;
  data: Data;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_INDEX_KEY = 'page'; // pageIndex, page,...
const PAGE_SIZE_KEY = 'limit'; // pageSize, perPage, limit,...

const usePagination = <T extends PaginationResponse<D>, D extends any[]>(
  requestCallback: (requestConfig: AxiosRequestConfig) => Promise<T>,
  { pageSize = DEFAULT_PAGE_SIZE, params = {}, accessProperties = ['data'] }: PaginationConfig = {},
): UsePaginationReturn => {
  const controller = useRef(new AbortController()).current;
  const paginationRef = useRef<PaginationRef<PaginationConfig['params']>>({
    isFirstCall: true,
    paramsRef: params,
    pageIndex: 1,
  }).current;
  const [pagination, setPagination] = useState<Pagination<D | never[]>>({
    fetching: true,
    refreshing: false,
    canLoadMore: true,
    data: [],
  });

  const setState = useCallback(
    (partialState: Partial<Pagination<D | never[]>>) =>
      setPagination(previousState => ({ ...previousState, ...partialState })),
    [],
  );

  const handleRequest = useCallback(async () => {
    try {
      const response = await requestCallback({
        params: {
          [PAGE_INDEX_KEY]: paginationRef.pageIndex,
          [PAGE_SIZE_KEY]: pageSize,
          ...paginationRef.paramsRef,
        },
        signal: controller.signal,
      });

      const responseData = deepAccessObject<D, T>(accessProperties as [keyof T], response);

      if (!Array.isArray(responseData)) return [];
      if (responseData.length < pageSize) setState({ canLoadMore: false });
      if (paginationRef.isFirstCall) {
        setState({ data: responseData });
      }

      return responseData;
    } catch (error) {
      logger(error);
    } finally {
      setState({ fetching: false });
      paginationRef.isFirstCall = false;
    }
  }, [setState, accessProperties, controller.signal, pageSize, requestCallback]);

  const onRefresh = useCallback(async () => {
    try {
      paginationRef.pageIndex = 1;
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
    if (!pagination.canLoadMore) return;
    try {
      paginationRef.pageIndex += 1;
      const responseData = await handleRequest();
      if (Array.isArray(responseData)) {
        setPagination(previousState => ({
          ...previousState,
          data: [...previousState.data, ...responseData] as D,
        }));
      }
    } catch (error) {
      logger(error);
    }
  }, [handleRequest, pagination.canLoadMore]);

  const cancelRequest = useCallback(() => controller.abort(), [controller]);

  useEffect(() => {
    handleRequest();

    return cancelRequest;
  }, []);

  useEffect(() => {
    if (!paginationRef.isFirstCall && !isEqual(params, paginationRef.paramsRef)) {
      paginationRef.paramsRef = params;
      onRefresh();
    }
  }, [params, onRefresh]);

  return {
    ...pagination,
    onRefresh,
    onLoadMore,
  };
};

export default usePagination;
