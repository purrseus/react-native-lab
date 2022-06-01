import { AuthScreenName, TabScreenName, UnAuthScreenName } from '@core/enums';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList, BottomTabParamList, UnAuthParamList } from './navigation';

export type AuthScreen<Name extends AuthScreenName> = (
  props: NativeStackScreenProps<AuthParamList, Name>,
) => JSX.Element;

export type UnAuthScreen<Name extends UnAuthScreenName> = (
  props: NativeStackScreenProps<UnAuthParamList, Name>,
) => JSX.Element;

export type TabScreen<Name extends TabScreenName> = (
  props: CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Name>,
    NativeStackScreenProps<AuthParamList>
  >,
) => JSX.Element;
