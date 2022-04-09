import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors } from '@themes';
import { StyleProp, ViewStyle } from 'react-native';

export const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: 'white',
  },
  animation: 'slide_from_right',
};

export const tabScreenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

export const tabScreenStyles: StyleProp<ViewStyle> = {
  backgroundColor: Colors.white,
};
