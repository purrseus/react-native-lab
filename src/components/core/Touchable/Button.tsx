import { HORIZONTAL_GRADIENT_COORDINATES } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { alphaHexColor, compareMemo } from '@utilities';
import { FC, useMemo } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgProps } from 'react-native-svg';
import ActivityIndicator from '../Loader/ActivityIndicator';
import Text from '../Text/Text';
import Touchable, { TouchableProps } from './Touchable';

type SizeName = 'small' | 'medium' | 'large';
type ButtonType = 'filled' | 'outlined' | 'tonal';
type ButtonSize = number;
type TitleSize = number;

interface ButtonProps extends TouchableProps {
  title: string;
  size?: SizeName;
  type?: ButtonType;
  gradient?: boolean;
  gradientColors?: ColorValue[];
  color?: ColorValue;
  centerTitle?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  LeftIcon?: FC<SvgProps>;
  RightIcon?: FC<SvgProps>;
}

const sizes: Record<SizeName, [ButtonSize, TitleSize]> = {
  small: [36, 14],
  medium: [46, 16],
  large: [52, 16],
};

const Button = compareMemo<ButtonProps>(
  ({
    type = 'filled',
    size = 'medium',
    color,
    style,
    title,
    gradient = false,
    gradientColors,
    centerTitle = true,
    titleStyle,
    loading,
    LeftIcon,
    RightIcon,
    disabled,
    ...props
  }) => {
    const [buttonSize, titleSize] = sizes[size];
    const styles = useStyle(createStyles(color));
    const contentStyle = styles[`${disabled ? 'disabled' : type}Color`];

    const LeftIconComponent = useMemo(
      () => (LeftIcon ? <LeftIcon stroke={contentStyle.color} /> : null),
      [LeftIcon, contentStyle.color],
    );

    const RightIconComponent = useMemo(
      () => (RightIcon ? <RightIcon stroke={contentStyle.color} /> : null),
      [RightIcon, contentStyle.color],
    );

    const LeftCounterWeight = useMemo(
      () =>
        !!RightIcon && centerTitle ? (
          <View style={styles.counterWeight}>{RightIconComponent}</View>
        ) : null,
      [RightIcon, RightIconComponent, centerTitle, styles.counterWeight],
    );

    const RightCounterWeight = useMemo(
      () =>
        !!LeftIcon && centerTitle ? (
          <View style={styles.counterWeight}>{LeftIconComponent}</View>
        ) : null,
      [LeftIcon, LeftIconComponent, centerTitle, styles.counterWeight],
    );

    return (
      <Touchable
        {...props}
        disabled={loading || disabled}
        style={[
          styles.container,
          { height: buttonSize },
          styles[type],
          !!disabled && styles.disabled,
          style,
        ]}
      >
        {gradient && (
          <LinearGradient
            colors={gradientColors || Object.values(styles.gradient)}
            {...HORIZONTAL_GRADIENT_COORDINATES}
            style={StyleSheet.absoluteFill}
          />
        )}

        {loading ? (
          <ActivityIndicator color={contentStyle.color} />
        ) : (
          <>
            {LeftIconComponent || LeftCounterWeight}
            <Text
              numberOfLines={1}
              style={[styles.title, { fontSize: titleSize }, contentStyle, titleStyle]}
            >
              {title}
            </Text>
            {RightIconComponent || RightCounterWeight}
          </>
        )}
      </Touchable>
    );
  },
);

const createStyles =
  (customColor?: ColorValue) =>
  ({ create, colors }: StyleCallbackParams) =>
    create({
      container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: 16,
      },
      gradient: [colors.primary, colors.blue] as ViewStyle,
      filled: {
        backgroundColor: customColor || colors.primary,
      },
      outlined: {
        backgroundColor: colors.white,
        borderColor: customColor || colors.primary,
        borderWidth: 1,
      },
      tonal: {
        backgroundColor: customColor || alphaHexColor(colors.primary, 0.2),
      },
      disabled: {
        backgroundColor: colors.lightGray,
      },
      filledColor: {
        color: colors.white,
      },
      outlinedColor: {
        color: customColor || colors.primary,
      },
      tonalColor: {
        color: customColor || colors.primary,
      },
      disabledColor: {
        color: colors.darkGray,
      },
      title: {
        fontWeight: 'bold',
        maxWidth: '80%',
        marginHorizontal: 8,
      },
      counterWeight: {
        opacity: 0,
      },
    });

export default Button;
