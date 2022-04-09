import { useCallback, useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';
import { isAndroid, isIos } from '@utilities';

const useKeyboard = () => {
  const android = isAndroid();
  const ios = isIos();
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleKeyboardWillShow: KeyboardEventListener = useCallback(
    event => {
      if (ios) setKeyboardHeight(event.endCoordinates.height);
    },
    [ios],
  );

  const handleKeyboardDidShow: KeyboardEventListener = useCallback(
    event => {
      setKeyboardShown(true);
      if (android) setKeyboardHeight(event.endCoordinates.height);
    },
    [android],
  );

  const handleKeyboardWillHide: KeyboardEventListener = useCallback(() => {
    if (ios) setKeyboardHeight(0);
  }, [ios]);

  const handleKeyboardDidHide: KeyboardEventListener = useCallback(() => {
    setKeyboardShown(false);
    if (android) setKeyboardHeight(0);
  }, [android]);

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
