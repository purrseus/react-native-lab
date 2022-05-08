/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ONE_SECOND } from '@core/constants';
import { debounce } from 'lodash';
import { useCallback } from 'react';

const useDebounce = (
  callback: (...args: any) => any,
  dependencies: any[] = [],
  wait = ONE_SECOND,
) => useCallback(debounce(callback, wait), dependencies);

export default useDebounce;
