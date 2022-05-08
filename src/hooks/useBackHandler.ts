import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler, BackHandlerStatic } from 'react-native';

const useBackHandler = (
  onBackPress: (BackHandler: BackHandlerStatic) => boolean | null | undefined,
) => {
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', () =>
        onBackPress(BackHandler),
      );

      return () => subscription.remove();
    }, [onBackPress]),
  );
};

export default useBackHandler;
