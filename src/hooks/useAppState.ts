import { EffectCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';

const INACTIVE_REGEX = /inactive|background/;

const useAppState = (onActive?: EffectCallback, onInactive?: EffectCallback) => {
  const currentAppState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (currentAppState.current.match(INACTIVE_REGEX) && nextAppState === 'active') onActive?.();
      if (nextAppState.match(INACTIVE_REGEX)) onInactive?.();
      currentAppState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [onActive, onInactive]);
};

export default useAppState;
