import { AppScreenName, AuthScreenName, TabScreenName } from '@core/enums';
import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  [AuthScreenName.Login]: undefined;
  [AuthScreenName.Register]: undefined;
};

export type BottomTabParamList = {
  [TabScreenName.Home]: undefined;
  [TabScreenName.Messages]: undefined;
  [TabScreenName.Notification]: undefined;
  [TabScreenName.Profile]: undefined;
};

export type AppStackParamList = {
  [AppScreenName.BottomTab]: NavigatorScreenParams<BottomTabParamList>;
  [AppScreenName.Categories]: undefined;
  [AppScreenName.Settings]: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;
