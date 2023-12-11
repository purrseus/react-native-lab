import { ColorSchemeName, Keyboard } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

export const configureKeyboard = () => {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(true);
  KeyboardManager.setLayoutIfNeededOnUpdate(true);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarManageBehaviourBy('subviews');
  KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  KeyboardManager.setShouldShowToolbarPlaceholder(false);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setShouldPlayInputClicks(true);
  KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true);
};

export const changeKeyboardAppearance = (colorScheme: ColorSchemeName) => {
  Keyboard.dismiss();
  KeyboardManager.setKeyboardAppearance(colorScheme || 'light');
  KeyboardManager.setToolbarBarTintColor(colorScheme === 'dark' ? '#000000' : '#FFFFFF');
};
