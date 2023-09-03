import * as Icons from '@assets/icons';
import { BottomSpacer, Row, Spacer, Text, Touchable } from '@components/core';
import { HORIZONTAL_SAFETY_EDGES, TAB_BAR_HEIGHT } from '@core/constants';
import { TabScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useAppTranslation, useKeyboard, useStyle } from '@hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors as defaultColors, globalStyles } from '@themes';
import { createShadow } from '@utilities';
import { FC, useMemo } from 'react';
import { ColorValue, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

interface TabUI {
  icon: FC<SvgProps>;
  focusedIcon: FC<SvgProps>;
  focusedColor: ColorValue;
  label: string;
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export default function CustomizedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const styles = useStyle(createStyles);
  const { t } = useAppTranslation('tab');
  const { keyboardShown } = useKeyboard();

  const tabUI: Record<TabScreenName, TabUI> = useMemo(
    () => ({
      [TabScreenName.Home]: {
        icon: Icons.Home,
        focusedIcon: Icons.HomeFocused,
        focusedColor: defaultColors.purple,
        label: t('home'),
      },
      [TabScreenName.Messages]: {
        icon: Icons.Messages,
        focusedIcon: Icons.MessagesFocused,
        focusedColor: defaultColors.orange,
        label: t('messages'),
      },
      [TabScreenName.Notification]: {
        icon: Icons.Notification,
        focusedIcon: Icons.NotificationFocused,
        focusedColor: defaultColors.red,
        label: t('notification'),
      },
      [TabScreenName.Profile]: {
        icon: Icons.Profile,
        focusedIcon: Icons.ProfileFocused,
        focusedColor: defaultColors.blue,
        label: t('profile'),
      },
    }),
    [t],
  );

  const tabBarAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateY: withTiming(keyboardShown ? 100 : 0) }],
    }),
    [keyboardShown],
  );

  return (
    <AnimatedSafeAreaView
      edges={HORIZONTAL_SAFETY_EDGES}
      style={[styles.rootContainer, tabBarAnimatedStyle]}
    >
      <Row style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const screenName = route.name as TabScreenName;
          const { icon: Icon, focusedIcon: FocusedIcon, focusedColor, label } = tabUI[screenName];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: screenName,
                params: undefined,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Touchable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={globalStyles.flexFillCenter}
            >
              {isFocused ? (
                <FocusedIcon fill={focusedColor} />
              ) : (
                <Icon stroke={styles.icon.tintColor} />
              )}
              <Spacer h={4} />
              <Text
                style={[styles.label, isFocused && [{ color: focusedColor }, styles.focusedLabel]]}
              >
                {label}
              </Text>
            </Touchable>
          );
        })}
      </Row>

      <BottomSpacer type="halfSafeArea" />
    </AnimatedSafeAreaView>
  );
}

const createStyles = ({ colors, create }: StyleCallbackParams) =>
  create({
    rootContainer: {
      ...StyleSheet.absoluteFillObject,
      top: undefined,
      ...createShadow(colors.shadow, [0, 0], 0.1, 10, 20),
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.tabBarBackground,
    },
    container: {
      height: TAB_BAR_HEIGHT,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    icon: {
      tintColor: colors.tabBlur,
    },
    label: {
      fontSize: 12,
      color: colors.tabBlur,
    },
    focusedLabel: {
      fontWeight: 'bold',
    },
  });
