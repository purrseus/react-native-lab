/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/split-platform-components */
import { ONE_SECOND } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { I18nText } from '@core/types';
import { useColor, useStyle } from '@hooks';
import { alphaHexColor, isAndroid, isIos, wait } from '@utilities';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionSheetIOS,
  ActionSheetIOSOptions,
  ColorValue,
  ListRenderItem,
  useColorScheme,
  View,
} from 'react-native';
import Divider from './Divider';
import ListView from './ListView';
import Modal from './Modal';
import Spacer from './Spacer';
import Text from './Text';
import Touchable from './Touchable';

export interface ActionSheetRef {
  show: () => void;
  /** @platform android */
  hide: () => void;
}

export interface ActionSheetProps extends ActionSheetIOSOptions {
  options: I18nText[];
  title?: I18nText;
  message?: I18nText;
  onSelect: (buttonIndex: number) => void;
}

const ACTION_SHEET_ANIMATION_IN_TIMING = ONE_SECOND / 3;
const ACTION_SHEET_ANIMATION_OUT_TIMING = ACTION_SHEET_ANIMATION_IN_TIMING * 2;
const DEFAULT_MARGIN = 8;

const ActionSheet = forwardRef<ActionSheetRef, ActionSheetProps>(
  ({ onSelect, cancelButtonIndex = 0, tintColor, title, message, ...props }, ref) => {
    const colors = useColor();
    const { t } = useTranslation();
    const colorScheme = useColorScheme();
    const styles = useStyle(createStyles);
    const [isVisible, setIsVisible] = useState(false);
    const options = useMemo(
      () => props.options.filter((_, index) => index !== cancelButtonIndex),
      [],
    );

    const onShow = () => {
      if (isIos) {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            ...props,
            title: title ? (t(title) as string) : undefined,
            message: message ? (t(message) as string) : undefined,
            options: props.options.map(t) as string[],
            userInterfaceStyle: colorScheme || 'light',
            tintColor: tintColor || colors.primaryText,
            cancelButtonIndex,
          },
          onSelect,
        );
        return;
      }

      setIsVisible(true);
    };

    const onHide = async (isBackdropPress = true) => {
      if (!isAndroid) return;
      setIsVisible(false);
      await wait(ACTION_SHEET_ANIMATION_IN_TIMING);
      if (isBackdropPress) onSelect(cancelButtonIndex);
    };

    const handleSelectOption = (buttonIndex: number, isCancel?: boolean) => async () => {
      await onHide(false);
      onSelect(
        buttonIndex === cancelButtonIndex && isCancel
          ? cancelButtonIndex
          : props.options.indexOf(options[buttonIndex]),
      );
    };

    useImperativeHandle(ref, () => ({
      show: onShow,
      hide: onHide,
    }));

    const ItemSeparatorComponent = useCallback(
      () => <Divider height={1 / 3} color={styles.divider.color} />,
      [],
    );

    const ListHeaderComponent = useMemo(
      () =>
        !!title || !!message ? (
          <View>
            <View style={styles.header}>
              {!!title && (
                <Text style={[styles.headerText, !!message && styles.boldedTitle]}>{t(title)}</Text>
              )}
              {!!title && !!message && <Spacer h4 />}
              {!!message && (
                <Text style={[styles.headerText, !title && styles.boldedTitle]}>{t(message)}</Text>
              )}
              {!!title && !!message && <Spacer h8 />}
            </View>

            <Divider height={0.5} color={styles.divider.color} />
          </View>
        ) : null,
      [],
    );

    const renderOptionItem: ListRenderItem<I18nText> = useCallback(
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
            {t(item)}
          </Text>
        </Touchable>
      ),
      [options],
    );

    if (isIos) return null;
    return (
      <Modal
        type="bottomSheet"
        isVisible={isVisible}
        animationInTiming={ACTION_SHEET_ANIMATION_IN_TIMING}
        animationOutTiming={ACTION_SHEET_ANIMATION_OUT_TIMING}
        onBackdropPress={onHide}
      >
        <View style={styles.container}>
          <ListView
            data={options}
            scrollEnabled={false}
            renderItem={renderOptionItem}
            style={styles.optionContainer}
            {...{ ListHeaderComponent, ItemSeparatorComponent }}
          />
          <Spacer height={DEFAULT_MARGIN} />
          <View style={styles.optionContainer}>
            <Touchable onPress={handleSelectOption(cancelButtonIndex, true)} style={styles.option}>
              <Text
                style={[
                  styles.optionTitle,
                  styles.cancelTitle,
                  !!tintColor && { color: tintColor as ColorValue },
                ]}
              >
                {t(props.options[cancelButtonIndex])}
              </Text>
            </Touchable>
          </View>
        </View>
      </Modal>
    );
  },
);

const createStyles = ({ create, colors, edgeInsets, dimensions }: StyleCallbackParams) =>
  create({
    container: {
      alignSelf: 'center',
      width: dimensions.width - DEFAULT_MARGIN * 2 - edgeInsets.left - edgeInsets.right,
      marginBottom: edgeInsets.bottom || DEFAULT_MARGIN,
      marginTop: edgeInsets.top,
    },
    optionContainer: {
      borderRadius: 12,
      backgroundColor: alphaHexColor(colors.white, 0.95),
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
      fontWeight: 'bold',
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
      fontWeight: 'bold',
    },
    divider: {
      color: alphaHexColor(colors.darkGray, 0.5),
    },
  });

export default ActionSheet;
