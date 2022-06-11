import enUS from './locales/en-US.json';
import viVN from './locales/vi-VN.json';

type FontName = 'Quicksand';
type FontStyle = 'Light' | 'Regular' | 'Medium' | 'SemiBold' | 'Bold';
type FontFamily = `${FontName}-${FontStyle}`;
type FontKey = Uncapitalize<`${FontName}${FontStyle}`>;

export const fonts: Readonly<Record<FontKey, FontFamily>> = {
  quicksandLight: 'Quicksand-Light',
  quicksandRegular: 'Quicksand-Regular',
  quicksandMedium: 'Quicksand-Medium',
  quicksandSemiBold: 'Quicksand-SemiBold',
  quicksandBold: 'Quicksand-Bold',
};

export const icons = {
  // Tab icons
  home: require('@assets/icons/tabs/home/home.png'),
  message: require('@assets/icons/tabs/messages/message.png'),
  notification: require('@assets/icons/tabs/notification/notification.png'),
  profile: require('@assets/icons/tabs/profile/profile.png'),
  homeFocused: require('@assets/icons/tabs/home/home-focused.png'),
  messageFocused: require('@assets/icons/tabs/messages/message-focused.png'),
  notificationFocused: require('@assets/icons/tabs/notification/notification-focused.png'),
  profileFocused: require('@assets/icons/tabs/profile/profile-focused.png'),
};

export const images = {};

export const locales = { enUS, viVN };
