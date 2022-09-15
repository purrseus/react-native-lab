/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpSignal } from '@core/types';
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

  const update = useCallback(
    <K extends keyof ApiStatus<T>>(key: K, value: ApiStatus<T>[K]) =>
      updateApiStatus(draft => {
        draft[key] = value;
      }),
    [updateApiStatus],
  );

  const fetch = useCallback(async () => {
    if (!controller.current) return;

    try {
      update('fetching', true);
      const response = await request(controller.current.signal);
      update('data', response);
    } catch (error) {
      update('error', error);
    } finally {
      update('fetching', false);
    }
  }, deps);

  useEffect(() => {
    fetch();

    return () => {
      controller.current?.abort();
      controller.current = null;
    };
  }, deps);

  return [apiStatus, fetch];
};
export default useApi;
