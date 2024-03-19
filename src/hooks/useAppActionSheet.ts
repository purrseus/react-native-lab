import {
  ActionSheetOptions,
  ActionSheetProps,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { useCallback, useMemo } from 'react';
import useTailwind from './useTailwind';

type UseActionSheet = (
  ...args: Parameters<ActionSheetProps['showActionSheetWithOptions']>
) => () => void;

const useAppActionSheet: UseActionSheet = (actionSheetOptions, callback) => {
  const tw = useTailwind();
  const { showActionSheetWithOptions } = useActionSheet();

  const [options, cancelButtonIndex] = useMemo(() => {
    const shouldReorderOptions =
      isAndroid() && Number.isInteger(actionSheetOptions.cancelButtonIndex);

    if (!shouldReorderOptions) {
      return [actionSheetOptions.options, actionSheetOptions.cancelButtonIndex];
    }

    const reorderOptions = actionSheetOptions.options.swap(
      actionSheetOptions.cancelButtonIndex!,
      actionSheetOptions.options.lastIndex,
    );

    return [reorderOptions, reorderOptions.lastIndex];
  }, [actionSheetOptions.cancelButtonIndex, actionSheetOptions.options]);

  const showActionSheet = useCallback(() => {
    const additionalOptions: ActionSheetOptions = {
      options,
      cancelButtonIndex,
      userInterfaceStyle: tw.prefixMatch('dark') ? 'dark' : 'light',
      containerStyle: tw`bg-white dark:bg-zinc-900 rounded-t-2xl`,
      titleTextStyle: tw.style(
        'text-sm bg-zinc-400/80',
        !!actionSheetOptions.message && 'font-bold',
      ),
      messageTextStyle: tw.style(
        'text-sm bg-zinc-400/80',
        !!actionSheetOptions.title && 'mt-0 font-bold',
      ),
      textStyle: tw`shrink text-zinc-700 dark:text-white`,
      showSeparators: false,
      autoFocus: true,
      useModal: true,
      destructiveColor: tw.color('red-500'),
    };

    return showActionSheetWithOptions({ ...actionSheetOptions, ...additionalOptions }, index =>
      callback(!index ? index : actionSheetOptions.options.indexOf(options[index])),
    );
  }, [options, cancelButtonIndex, tw, actionSheetOptions, showActionSheetWithOptions, callback]);

  return showActionSheet;
};

export default useAppActionSheet;
