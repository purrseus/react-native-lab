import { isAndroid, isIos } from '@utilities';
import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';

const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardWillShowListener: KeyboardEventListener = event => {
    if (isIos()) setKeyboardHeight(event.endCoordinates.height);
  };

  const keyboardDidShowListener: KeyboardEventListener = event => {
    setKeyboardShown(true);
    if (isAndroid()) setKeyboardHeight(event.endCoordinates.height);
  };

  const keyboardWillHideListener: KeyboardEventListener = () => {
    if (isIos()) setKeyboardHeight(0);
  };

  const keyboardDidHideListener: KeyboardEventListener = () => {
    setKeyboardShown(false);
    if (isAndroid()) setKeyboardHeight(0);
  };

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
  }, []);

  return { keyboardShown, keyboardHeight };
};

export default useKeyboard;
