import { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';
import { isAndroid, isIos } from '@utilities';

const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardWillShow: KeyboardEventListener = useCallback(event => {
    if (isIos) setKeyboardHeight(event.endCoordinates.height);
  }, []);

  const handleKeyboardDidShow: KeyboardEventListener = useCallback(event => {
    setKeyboardShown(true);
    if (isAndroid) setKeyboardHeight(event.endCoordinates.height);
  }, []);

  const handleKeyboardWillHide: KeyboardEventListener = useCallback(() => {
    if (isIos) setKeyboardHeight(0);
  }, []);

  const handleKeyboardDidHide: KeyboardEventListener = useCallback(() => {
    setKeyboardShown(false);
    if (isAndroid) setKeyboardHeight(0);
  }, []);

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [
    handleKeyboardWillShow,
    handleKeyboardDidShow,
    handleKeyboardWillHide,
    handleKeyboardDidHide,
  ]);

  return { keyboardShown, keyboardHeight };
};

export default useKeyboard;
