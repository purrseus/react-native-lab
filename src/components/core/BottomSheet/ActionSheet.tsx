/* eslint-disable react-native/split-platform-components */
import { ONE_SECOND } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useAppSelector, useColor, useStyle, useThrottle } from '@hooks';
import { alphaHexColor, compareMemo, isIos, wait } from '@utilities';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import {
  ActionSheetIOS,
  ActionSheetIOSOptions,
  ColorValue,
  ListRenderItem,
  useColorScheme,
  View,
} from 'react-native';
import Touchable from '../Button/Touchable';
import Divider from '../Divider';
import ListView from '../List/ListView';
import Modal from '../Modal/Modal';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';

export interface ActionSheetMethods {
  show: () => void;
  /** @platform android */
  hide: () => void;
}

export interface ActionSheetProps extends ActionSheetIOSOptions {
  options: string[];
  title?: string;
  message?: string;
  onSelect: (buttonIndex: number) => void;
}

const ACTION_SHEET_ANIMATION_IN_TIMING = ONE_SECOND / 3;
const ACTION_SHEET_ANIMATION_OUT_TIMING = ACTION_SHEET_ANIMATION_IN_TIMING * 2;
const DEFAULT_MARGIN = 8;

const ActionSheet = compareMemo<ActionSheetMethods, ActionSheetProps>(
  forwardRef(({ onSelect, cancelButtonIndex = 0, tintColor, title, message, ...props }, ref) => {
    const colors = useColor();
    const styles = useStyle(createStyles);
    const { theme } = useAppSelector(state => state.common);
    const colorScheme = useColorScheme();
    const [isVisible, setIsVisible] = useState(false);

    const options = useMemo(() => {
      const clonedOptions = [...props.options];
      clonedOptions.splice(cancelButtonIndex, 1);
      return clonedOptions;
    }, [cancelButtonIndex, props.options]);

    const onShow = useThrottle(
      () => {
        if (isIos()) {
          // TODO: Add dismissActionSheet method to ActionSheetIOS
          ActionSheetIOS.showActionSheetWithOptions(
            {
              ...props,
              title: title ? title : undefined,
              message: message ? message : undefined,
              options: props.options,
              userInterfaceStyle: theme === 'auto' ? colorScheme || 'light' : theme,
              tintColor: tintColor || colors.primaryText,
              cancelButtonIndex,
            },
            onSelect,
          );
          return;
        }

        setIsVisible(true);
      },
      [
        cancelButtonIndex,
        colorScheme,
        colors.primaryText,
        message,
        onSelect,
        props,
        theme,
        tintColor,
        title,
      ],
      ONE_SECOND / 2,
    );

    const onHide = useThrottle(
      async (buttonIndex = cancelButtonIndex) => {
        if (!isIos()) {
          setIsVisible(false);
          await wait(ACTION_SHEET_ANIMATION_IN_TIMING);
          onSelect(buttonIndex);
        }
      },
      [cancelButtonIndex, onSelect],
      ONE_SECOND / 2,
    );

    const handleSelectOption = useCallback(
      (buttonIndex: number, isCancel?: boolean) => async () => {
        await onHide(
          buttonIndex === cancelButtonIndex && isCancel
            ? cancelButtonIndex
            : props.options.indexOf(options[buttonIndex]),
        );
      },
      [cancelButtonIndex, onHide, options, props.options],
    );

    useImperativeHandle(
      ref,
      () => ({
        show: onShow,
        hide: onHide,
      }),
      [onShow, onHide],
    );

    const ItemSeparatorComponent = useCallback(
      () => <Divider height={1 / 3} color={styles.divider.color} />,
      [styles.divider.color],
    );

    const ListHeaderComponent = useMemo(
      () =>
        !!title || !!message ? (
          <View>
            <View style={styles.header}>
              {!!title && (
                <Text style={[styles.headerText, !!message && styles.boldedTitle]}>{title}</Text>
              )}
              {!!title && !!message && <Spacer h={4} />}
              {!!message && (
                <Text style={[styles.headerText, !title && styles.boldedTitle]}>{message}</Text>
              )}
              {!!title && !!message && <Spacer h={4} />}
            </View>

            <Divider height={0.5} color={styles.divider.color} />
          </View>
        ) : null,
      [message, styles.boldedTitle, styles.divider.color, styles.header, styles.headerText, title],
    );

    const renderOptionItem: ListRenderItem<string> = useCallback(
      ({ item, index }) => (
        <Touchable onPress={handleSelectOption(index)} style={styles.option}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            ellipsizeMode="middle"
            style={[
              styles.optionTitle,
              !!tintColor && { color: tintColor as ColorValue },
              typeof props.destructiveButtonIndex === 'number' &&
                props.destructiveButtonIndex === props.options.indexOf(options[index]) &&
                styles.destructiveTitle,
            ]}
          >
            {item}
          </Text>
        </Touchable>
      ),
      [
        options,
        handleSelectOption,
        props.destructiveButtonIndex,
        props.options,
        tintColor,
        styles.destructiveTitle,
        styles.option,
        styles.optionTitle,
      ],
    );

    if (isIos()) return null;
    return (
      <Modal
        type="bottomSheet"
        isVisible={isVisible}
        animationInTiming={ACTION_SHEET_ANIMATION_IN_TIMING}
        animationOutTiming={ACTION_SHEET_ANIMATION_OUT_TIMING}
        onBackdropPress={() => onHide()}
      >
        <View style={styles.container}>
          <ListView
            data={options}
            scrollEnabled={false}
            renderItem={renderOptionItem}
            style={styles.optionContainer}
            {...{ ListHeaderComponent, ItemSeparatorComponent }}
          />
          <Spacer h={DEFAULT_MARGIN} />
          <View style={styles.optionContainer}>
            <Touchable onPress={handleSelectOption(cancelButtonIndex, true)} style={styles.option}>
              <Text
                style={[
                  styles.optionTitle,
                  styles.cancelTitle,
                  !!tintColor && { color: tintColor as ColorValue },
                ]}
              >
                {props.options[cancelButtonIndex]}
              </Text>
            </Touchable>
          </View>
        </View>
      </Modal>
    );
  }),
);

const createStyles = ({ create, colors, edgeInsets, dimensions, fonts }: StyleCallbackParams) =>
  create({
    container: {
      alignSelf: 'center',
      width: dimensions.width - DEFAULT_MARGIN * 2 - edgeInsets.left - edgeInsets.right,
      marginBottom: edgeInsets.bottom || DEFAULT_MARGIN,
      marginTop: edgeInsets.top,
    },
    optionContainer: {
      borderRadius: 12,
      backgroundColor: colors.white,
    },
    header: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 12,
      color: alphaHexColor(colors.darkGray, 0.8),
    },
    boldedTitle: {
      fontFamily: fonts.quicksandBold,
    },
    option: {
      alignItems: 'center',
      paddingVertical: 16,
    },
    optionTitle: {
      fontSize: 18,
    },
    destructiveTitle: {
      color: colors.red,
    },
    cancelTitle: {
      fontFamily: fonts.quicksandBold,
    },
    divider: {
      color: alphaHexColor(colors.darkGray, 0.5),
    },
  });

export default ActionSheet;
