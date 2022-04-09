import { Icons } from '@assets';
import { TabRouteName } from '@core/enums';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, commonStyles } from '@themes';
import React, { FC } from 'react';
import { Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TabStyle = {
  [TabRouteName.Home]: {
    icon: Icons.home,
    iconFocused: Icons.homeFocused,
    focusedColor: Colors.purple,
  },
  [TabRouteName.Chats]: {
    icon: Icons.chat,
    iconFocused: Icons.chatFocused,
    focusedColor: Colors.orange,
  },
  [TabRouteName.Notification]: {
    icon: Icons.notification,
    iconFocused: Icons.notificationFocused,
    focusedColor: Colors.red,
  },
  [TabRouteName.Profile]: {
    icon: Icons.profile,
    iconFocused: Icons.profileFocused,
    focusedColor: Colors.blue,
  },
};

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.rootContainer}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;
          const { icon, iconFocused, focusedColor } = TabStyle[label as TabRouteName];

          const isFocused = state.index === index;

          const onPress = () => {
            LayoutAnimation.easeInEaseOut();
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
                source={isFocused ? iconFocused : icon}
                style={[styles.icon, isFocused && { tintColor: focusedColor }]}
              />
              <Text
                style={[
                  styles.label,
                  isFocused && {
                    color: focusedColor,
                    ...styles.focusedLabel,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 20,
  },
  container: {
    flexDirection: 'row',
    height: 70,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.darkGray,
  },
  label: {
    fontSize: 14,
    marginTop: 4,
    color: Colors.darkGray,
  },
  focusedLabel: {
    fontWeight: 'bold',
  },
});

export default TabBar;
