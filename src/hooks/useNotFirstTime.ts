/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useNotFirstTime = (effect: EffectCallback, deps: DependencyList) => {
  const isFirstRenderTime = useRef(true);
  const destructor = useRef<ReturnType<EffectCallback>>();

  return useEffect(() => {
    if (isFirstRenderTime.current) {
      isFirstRenderTime.current = false;
    } else {
      destructor.current = effect();
    }

    if (!isFirstRenderTime.current && !!destructor.current) return destructor.current;
  }, [deps]);
};

export default useNotFirstTime;
