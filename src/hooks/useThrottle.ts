/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DEFAULT_THROTTLE_SETTINGS, ONE_SECOND } from '@core/constants';
import { throttle } from 'lodash';
import { useCallback } from 'react';

const useThrottle = (
  callback: (...args: any) => any,
  dependencies: any[] = [],
  wait = ONE_SECOND,
  throttleSettings = DEFAULT_THROTTLE_SETTINGS,
) => useCallback(throttle(callback, wait, throttleSettings), dependencies);

export default useThrottle;
