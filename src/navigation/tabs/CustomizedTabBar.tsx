import { icons } from '@assets';
import { BottomTabSpacer, Icon, LocalizedText, Row, Spacer, Touchable } from '@components/core';
import { HORIZONTAL_SAFETY_EDGES, TAB_BAR_HEIGHT } from '@core/constants';
import { TabScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { I18nText } from '@core/types';
import { useKeyboard, useStyle } from '@hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors as Colors, globalStyles } from '@themes';
import { createShadow } from '@utilities';
import React from 'react';
import { ColorValue, ImageRequireSource, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface TabUI {
  icon: ImageRequireSource;
  focusedIcon: ImageRequireSource;
  focusedColor: ColorValue;
  label: I18nText;
}

const tabUI: Record<TabScreenName, TabUI> = {
  [TabScreenName.Home]: {
    icon: icons.home,
    focusedIcon: icons.homeFocused,
    focusedColor: Colors.purple,
    label: 'tab.home',
  },
  [TabScreenName.Messages]: {
    icon: icons.message,
    focusedIcon: icons.messageFocused,
    focusedColor: Colors.orange,
    label: 'tab.messages',
  },
  [TabScreenName.Notification]: {
    icon: icons.notification,
    focusedIcon: icons.notificationFocused,
    focusedColor: Colors.red,
    label: 'tab.notification',
  },
  [TabScreenName.Profile]: {
    icon: icons.profile,
    focusedIcon: icons.profileFocused,
    focusedColor: Colors.blue,
    label: 'tab.profile',
  },
};

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const CustomizedTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const styles = useStyle(createStyles);
  const { keyboardShown } = useKeyboard();

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
          const { icon, focusedIcon, focusedColor, label } = tabUI[screenName];
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
              style={globalStyles.flexCenter}
            >
              <Icon
                size={24}
                source={isFocused ? focusedIcon : icon}
                style={[styles.icon, isFocused && { tintColor: focusedColor as string }]}
              />
              <Spacer h4 />
              <LocalizedText
                style={[styles.label, isFocused && [{ color: focusedColor }, styles.focusedLabel]]}
                t={label}
              />
            </Touchable>
          );
        })}
      </Row>

      <BottomTabSpacer heightOffset={0} />
    </AnimatedSafeAreaView>
  );
};

const createStyles = ({ colors, create, fonts }: StyleCallbackParams) =>
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
      fontFamily: fonts.quicksandBold,
    },
  });

export default CustomizedTabBar;
