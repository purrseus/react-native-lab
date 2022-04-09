import { Icons } from '@assets';
import { TabRouteName } from '@core/enums';
import { useStyle } from '@hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, commonStyles } from '@themes';
import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styleCallback from './styles';
import { TabStyle } from './types';

export const TabBarStyle: Record<TabRouteName, TabStyle> = {
  [TabRouteName.Home]: {
    icon: Icons.home,
    focusedIcon: Icons.homeFocused,
    focusedColor: colors.purple,
  },
  [TabRouteName.Chats]: {
    icon: Icons.chat,
    focusedIcon: Icons.chatFocused,
    focusedColor: colors.orange,
  },
  [TabRouteName.Notification]: {
    icon: Icons.notification,
    focusedIcon: Icons.notificationFocused,
    focusedColor: colors.red,
  },
  [TabRouteName.Profile]: {
    icon: Icons.profile,
    focusedIcon: Icons.profileFocused,
    focusedColor: colors.blue,
  },
};

const CustomTabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const styles = useStyle(styleCallback);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;
          const { icon, focusedIcon, focusedColor } = TabBarStyle[label as TabRouteName];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name as TabRouteName,
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
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={commonStyles.flexCenter}
            >
              <Image
                source={isFocused ? focusedIcon : icon}
                style={[styles.icon, isFocused && { tintColor: focusedColor }]}
              />
              <Text
                style={[styles.label, isFocused && [{ color: focusedColor }, styles.focusedLabel]]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.bottomInset} />
    </View>
  );
};

export default CustomTabBar;
