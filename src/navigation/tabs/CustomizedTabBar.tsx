import { icons } from '@assets';
import { LocalizedText, Icon, Touchable } from '@components/base';
import { TAB_BAR_HEIGHT } from '@core/constants';
import { TabScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { I18nText } from '@core/types';
import { useStyle } from '@hooks';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors as Colors, commonStyles } from '@themes';
import React, { FC } from 'react';
import { ColorValue, ImageRequireSource, View } from 'react-native';

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

const CustomizedTabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const styles = useStyle(styleCallback);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
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
              style={commonStyles.flexCenter}
            >
              <Icon
                size={24}
                source={isFocused ? focusedIcon : icon}
                tintColor={isFocused ? (focusedColor as string) : styles.icon.tintColor}
                style={styles.icon}
              />
              <LocalizedText
                style={[styles.label, isFocused && [{ color: focusedColor }, styles.focusedLabel]]}
                text={label}
              />
            </Touchable>
          );
        })}
      </View>

      <View style={styles.bottomInset} />
    </View>
  );
};

const styleCallback = ({ colors, create, edgeInsets }: StyleCallbackParams) =>
  create({
    rootContainer: {
      shadowColor: colors.shadowTabBar,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 10,
      elevation: 20,
      borderWidth: 0.1,
    },
    container: {
      flexDirection: 'row',
      height: TAB_BAR_HEIGHT,
      backgroundColor: colors.tabBarBackground,
    },
    icon: {
      tintColor: colors.tabBlur,
    },
    label: {
      fontSize: 12,
      marginTop: 4,
      color: colors.tabBlur,
    },
    focusedLabel: {
      fontWeight: 'bold',
    },
    bottomInset: {
      height: edgeInsets.bottom / 2,
      width: '100%',
      backgroundColor: colors.tabBarBackground,
    },
  });

export default CustomizedTabBar;
