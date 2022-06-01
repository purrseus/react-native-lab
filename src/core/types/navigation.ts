import { AuthScreenName, TabScreenName, UnAuthScreenName } from '@core/enums';
import { NavigatorScreenParams } from '@react-navigation/native';

export type UnAuthParamList = {
  [UnAuthScreenName.Login]: undefined;
  [UnAuthScreenName.Register]: undefined;
};

export type BottomTabParamList = {
  [TabScreenName.Home]: undefined;
  [TabScreenName.Messages]: undefined;
  [TabScreenName.Notification]: undefined;
  [TabScreenName.Profile]: undefined;
};

export type AuthParamList = {
  [AuthScreenName.BottomTab]: NavigatorScreenParams<BottomTabParamList>;
  [AuthScreenName.Categories]: undefined;
  [AuthScreenName.Settings]: undefined;
};

export type RootStackParamList = UnAuthParamList & AuthParamList;
