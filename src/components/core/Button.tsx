import { DEFAULT_ICON_SIZE, HORIZONTAL_GRADIENT_COORDINATES } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { I18nText } from '@core/types';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React from 'react';
import {
  ColorValue,
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicator from './ActivityIndicator';
import Icon, { IconProps } from './Icon';
import LocalizedText from './LocalizedText';
import Spacer from './Spacer';
import Touchable, { TouchableProps } from './Touchable';

type SizeName = 'small' | 'medium' | 'large';
type ButtonType = 'normal' | 'outline';
type ButtonSize = number;
type TitleSize = number;

interface ButtonProps extends TouchableProps {
  title: I18nText;
  size?: SizeName;
  type?: ButtonType;
  gradient?: boolean;
  gradientColors?: ColorValue[];
  color?: ColorValue;
  titleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  leftIcon?: ImageRequireSource;
  rightIcon?: ImageRequireSource;
  iconSpacing?: number;
  iconSize?: number | [number, number];
  iconProps?: Partial<IconProps>;
}

const sizes: Record<SizeName, [ButtonSize, TitleSize]> = {
  small: [36, 14],
  medium: [46, 16],
  large: [52, 16],
};

const Button = compareMemo<ButtonProps>(
  ({
    type = 'normal',
    size = 'medium',
    color,
    style,
    title,
    gradient = false,
    gradientColors,
    titleStyle,
    loading = false,
    leftIcon,
    rightIcon,
    iconSpacing = 0,
    iconSize,
    iconProps,
    disabled,
    ...props
  }) => {
    const [buttonSize, titleSize] = sizes[size];
    const hasLeftIcon = typeof leftIcon === 'number';
    const hasRightIcon = typeof rightIcon === 'number';
    const [leftIconSize, rightIconSize]: number[] = Array.isArray(iconSize)
      ? iconSize
      : new Array(2).fill(iconSize || DEFAULT_ICON_SIZE);
    const styles = useStyle(styleCallback(color));

    return (
      <Touchable
        {...props}
        disabled={loading || disabled}
        style={[styles.container, styles[type], { height: buttonSize }, style]}
      >
        {gradient && (
          <LinearGradient
            colors={gradientColors || Object.values(styles.gradient)}
            {...HORIZONTAL_GRADIENT_COORDINATES}
            style={StyleSheet.absoluteFill}
          />
        )}

        {loading ? (
          <ActivityIndicator color={styles[`${type}Color`].color} />
        ) : (
          <>
            {hasLeftIcon ? (
              <Icon
                source={leftIcon}
                size={leftIconSize}
                tintColor={styles[`${type}Color`].color as string}
                {...iconProps}
                style={[{ marginRight: iconSpacing }, iconProps?.style]}
              />
            ) : hasRightIcon ? (
              <Spacer {...{ [`w${rightIconSize + iconSpacing}`]: true }} />
            ) : null}

            <LocalizedText
              t={title}
              numberOfLines={1}
              style={[styles.title, styles[`${type}Color`], { fontSize: titleSize }, titleStyle]}
            />

            {hasRightIcon ? (
              <Icon
                source={rightIcon}
                size={rightIconSize}
                tintColor={styles[`${type}Color`].color as string}
                {...iconProps}
                style={[{ marginLeft: iconSpacing }, iconProps?.style]}
              />
            ) : hasLeftIcon ? (
              <Spacer {...{ [`w${leftIconSize + iconSpacing}`]: true }} />
            ) : null}
          </>
        )}
      </Touchable>
    );
  },
);

const styleCallback =
  (customColor?: ColorValue) =>
  ({ create, colors }: StyleCallbackParams) =>
    create({
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
      },
      gradient: [colors.primary, colors.blue] as ViewStyle,
      normal: {
        backgroundColor: customColor || colors.primary,
      },
      outline: {
        backgroundColor: colors.white,
        borderColor: customColor || colors.primary,
        borderWidth: 1,
      },
      normalColor: {
        color: colors.white,
      },
      outlineColor: {
        color: customColor || colors.primary,
      },
      title: {
        fontWeight: 'bold',
        maxWidth: '80%',
      },
    });

export default Button;
