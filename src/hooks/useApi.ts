/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpSignal } from '@core/types';
import { Draft } from 'immer';
import { DependencyList, useCallback, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';

interface ApiStatus<T> {
  fetching: boolean;
  data?: Awaited<T>;
  error?: any;
}

const useApi = <T>(
  request: HttpSignal<T>,
  deps: DependencyList,
): [ApiStatus<T>, () => Promise<void>] => {
  const controller = useRef<AbortController | null>(new AbortController());
  const [apiStatus, updateApiStatus] = useImmer<ApiStatus<T>>({
    fetching: false,
  });

  const fetch = useCallback(async () => {
    if (!controller.current) return;

    try {
      updateApiStatus(draft => {
        draft.fetching = true;
      });
      const response = await request(controller.current.signal);
      updateApiStatus(draft => {
        draft.data = response as Draft<Awaited<T>>;
      });
    } catch (error) {
      updateApiStatus(draft => {
        draft.error = error;
      });
    } finally {
      updateApiStatus(draft => {
        draft.fetching = false;
      });
    }
  }, deps);

  useEffect(() => {
    fetch();

    return () => {
      controller.current?.abort();
      controller.current = null;
    };
  }, [controller, fetch]);

  return [apiStatus, fetch];
};
export default useApi;
