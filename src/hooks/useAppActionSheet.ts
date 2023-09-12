import { StyleCallbackParams } from '@core/interfaces';
import {
  ActionSheetOptions,
  ActionSheetProps,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { useCommonStore } from '@stores';
import { alphaHexColor } from '@utils';
import { useCallback } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import useStyle from './useStyle';

type UseActionSheet = (
  ...args: Parameters<ActionSheetProps['showActionSheetWithOptions']>
) => () => void;

const useAppActionSheet: UseActionSheet = (actionSheetOptions, callback) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const theme = useCommonStore(state => state.theme);
  const colorScheme = useColorScheme();
  const styles = useStyle(createStyles);

  const showActionSheet = useCallback(() => {
    const keepOriginalValue = !Number.isInteger(actionSheetOptions.cancelButtonIndex) || isIos();

    const options = keepOriginalValue
      ? actionSheetOptions.options
      : actionSheetOptions.options.slice(1).concat(actionSheetOptions.options.slice(0, 1));

    const cancelButtonIndex = keepOriginalValue
      ? actionSheetOptions.cancelButtonIndex
      : options.lastIndex;

    const additionalOptions: ActionSheetOptions = {
      options,
      cancelButtonIndex,
      userInterfaceStyle: theme === 'auto' ? colorScheme || 'light' : theme,
      containerStyle: styles.container,
      titleTextStyle: StyleSheet.flatten([
        styles.title,
        !!actionSheetOptions.message && styles.boldedTitle,
      ]),
      messageTextStyle: StyleSheet.flatten([
        styles.title,
        !actionSheetOptions.title && styles.boldedMessage,
      ]),
      textStyle: styles.text,
      showSeparators: false,
      destructiveColor: styles.destructive.color,
    };

    return showActionSheetWithOptions({ ...actionSheetOptions, ...additionalOptions }, index =>
      callback(keepOriginalValue ? index : index === options.lastIndex ? 0 : (index ?? -1) + 1),
    );
  }, [actionSheetOptions, theme, colorScheme, styles, showActionSheetWithOptions, callback]);

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
