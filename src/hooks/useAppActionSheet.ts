import { StyleCallbackParams } from '@core/interfaces';
import {
  ActionSheetOptions,
  ActionSheetProps,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { useCommonStore } from '@stores';
import { alphaHexColor } from '@utilities';
import { useCallback } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import useStyle from './useStyle';

type UseActionSheet = (
  ...args: Parameters<ActionSheetProps['showActionSheetWithOptions']>
) => () => void;

const useAppActionSheet: UseActionSheet = (
  { options, cancelButtonIndex, ...otherOptions },
  callback,
) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useCommonStore(state => state.theme);
  const colorScheme = useColorScheme();
  const styles = useStyle(createStyles);

  const showActionSheet = useCallback(() => {
    const keepOriginalValue = !Number.isInteger(cancelButtonIndex) || isIos();
    const _options = keepOriginalValue ? options : options.slice(1).concat(options.slice(0, 1));
    const _cancelButtonIndex = keepOriginalValue ? cancelButtonIndex : options.lastIndex;

    const additionalOptions: ActionSheetOptions = {
      options: _options,
      cancelButtonIndex: _cancelButtonIndex,
      userInterfaceStyle: theme === 'auto' ? colorScheme || 'light' : theme,
      containerStyle: styles.container,
      titleTextStyle: StyleSheet.flatten([
        styles.title,
        !!otherOptions.message && styles.boldedTitle,
      ]),
      messageTextStyle: StyleSheet.flatten([
        styles.title,
        !otherOptions.title && styles.boldedMessage,
      ]),
      textStyle: styles.text,
      showSeparators: false,
      destructiveColor: styles.destructive.color,
    };

    return showActionSheetWithOptions({ ...otherOptions, ...additionalOptions }, index =>
      callback(keepOriginalValue ? index : index === options.lastIndex ? 0 : (index ?? -1) + 1),
    );
  }, [
    cancelButtonIndex,
    options,
    theme,
    colorScheme,
    styles,
    otherOptions,
    showActionSheetWithOptions,
    callback,
  ]);

  return showActionSheet;
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    container: {
      backgroundColor: colors.bottomSheetBackground,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    title: {
      fontSize: 14,
      color: alphaHexColor(colors.darkGray, 0.8),
    },
    boldedTitle: {
      fontWeight: 'bold',
    },
    boldedMessage: {
      marginTop: 0,
      fontWeight: 'bold',
    },
    text: {
      flexShrink: 1,
      color: colors.primaryText,
    },
    destructive: {
      color: colors.red,
    },
  });

export default useAppActionSheet;
