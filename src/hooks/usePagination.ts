/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationConfig, PaginationResponse, UsePaginationReturn } from '@core/interfaces';
import { deepAccessObject, logger } from '@utilities';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'react-fast-compare';

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
  config: PaginationConfig = {},
): UsePaginationReturn => {
  const { pageSize = DEFAULT_PAGE_SIZE, params = {}, accessProperties = ['data'] } = config;
  const controller = useRef(new AbortController()).current;
  const isFirstCall = useRef(true);
  const paramsRef = useRef(params);
  const pageIndex = useRef(1);
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
          [PAGE_INDEX_KEY]: pageIndex.current,
          [PAGE_SIZE_KEY]: pageSize,
          ...paramsRef.current,
        },
        signal: controller.signal,
      });

      const responseData = deepAccessObject<D, T>(accessProperties as [keyof T], response);

      if (!Array.isArray(responseData)) return [];
      if (responseData.length < pageSize) setState({ canLoadMore: false });
      if (isFirstCall.current) {
        setState({ data: responseData });
      }

      return responseData;
    } catch (error) {
      logger(error);
    } finally {
      setState({ fetching: false });
      isFirstCall.current = false;
    }
  }, [setState, accessProperties, controller.signal, pageSize, requestCallback]);

  const onRefresh = useCallback(async () => {
    try {
      pageIndex.current = 1;
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
      pageIndex.current += 1;
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

  const cancelRequest = useCallback(() => {
    controller.abort();
  }, [controller]);

  useEffect(() => {
    if (isFirstCall.current) handleRequest();

    return cancelRequest;
  }, []);

  useEffect(() => {
    if (!isFirstCall.current && !isEqual(params, paramsRef.current)) {
      paramsRef.current = params;
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
