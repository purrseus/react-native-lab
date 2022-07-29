import { ProtectedScreenName, TabScreenName, UnprotectedScreenName } from '@core/enums';
import { NavigatorScreenParams } from '@react-navigation/native';

export type UnprotectedParamList = {
  [UnprotectedScreenName.Login]: undefined;
  [UnprotectedScreenName.Register]: undefined;
};

export type BottomTabParamList = {
  [TabScreenName.Home]: undefined;
  [TabScreenName.Messages]: undefined;
  [TabScreenName.Notification]: undefined;
  [TabScreenName.Profile]: undefined;
};

export type ProtectedParamList = {
  [ProtectedScreenName.BottomTab]: NavigatorScreenParams<BottomTabParamList>;
  [ProtectedScreenName.Categories]: undefined;
  [ProtectedScreenName.Settings]: undefined;
};

export type RootStackParamList = UnprotectedParamList & ProtectedParamList;
