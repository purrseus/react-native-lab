import { AppRouteName, AuthRouteName, TabRouteName } from '@core/enums';
import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  [AuthRouteName.Login]: undefined;
  [AuthRouteName.Register]: undefined;
};

export type AppStackParamList = {
  [AppRouteName.BottomTab]: NavigatorScreenParams<BottomTabParamList>;
  [AppRouteName.Categories]: undefined;
  [AppRouteName.Settings]: undefined;
};

export type BottomTabParamList = {
  [TabRouteName.Home]: undefined;
  [TabRouteName.Chats]: undefined;
  [TabRouteName.Notification]: undefined;
  [TabRouteName.Profile]: undefined;
};
