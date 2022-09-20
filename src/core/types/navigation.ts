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
  // Showcase
  [ProtectedScreenName.ShowcaseList]: undefined;
  [ProtectedScreenName.BottomSheets]: undefined;
  [ProtectedScreenName.Buttons]: undefined;
  [ProtectedScreenName.Form]: undefined;
  [ProtectedScreenName.Images]: undefined;
  [ProtectedScreenName.List]: undefined;
  [ProtectedScreenName.Loader]: undefined;
  [ProtectedScreenName.Modals]: undefined;
  [ProtectedScreenName.Spacers]: undefined;
};

export type RootStackParamList = UnprotectedParamList & ProtectedParamList;
