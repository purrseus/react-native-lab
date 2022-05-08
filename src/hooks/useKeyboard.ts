import { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';
import { isAndroid, isIos } from '@utilities';

const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardWillShowListener: KeyboardEventListener = useCallback(event => {
    if (isIos) setKeyboardHeight(event.endCoordinates.height);
  }, []);

  const keyboardDidShowListener: KeyboardEventListener = useCallback(event => {
    setKeyboardShown(true);
    if (isAndroid) setKeyboardHeight(event.endCoordinates.height);
  }, []);

  const keyboardWillHideListener: KeyboardEventListener = useCallback(() => {
    if (isIos) setKeyboardHeight(0);
  }, []);

  const keyboardDidHideListener: KeyboardEventListener = useCallback(() => {
    setKeyboardShown(false);
    if (isAndroid) setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', keyboardWillShowListener),
      Keyboard.addListener('keyboardDidShow', keyboardDidShowListener),
      Keyboard.addListener('keyboardWillHide', keyboardWillHideListener),
      Keyboard.addListener('keyboardDidHide', keyboardDidHideListener),
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [
    keyboardWillShowListener,
    keyboardDidShowListener,
    keyboardWillHideListener,
    keyboardDidHideListener,
  ]);

  return { keyboardShown, keyboardHeight };
};

export default useKeyboard;
