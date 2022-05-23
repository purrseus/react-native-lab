import { AuthScreenName, TabScreenName, UnAuthScreenName } from '@core/enums';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, BottomTabParamList, UnAuthStackParamList } from './navigation';

export type AuthScreen<Name extends AuthScreenName> = (
  props: NativeStackScreenProps<AuthStackParamList, Name>,
) => JSX.Element;

export type UnAuthScreen<Name extends UnAuthScreenName> = (
  props: NativeStackScreenProps<UnAuthStackParamList, Name>,
) => JSX.Element;

export type TabScreen<Name extends TabScreenName> = (
  props: CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Name>,
    NativeStackScreenProps<AuthStackParamList>
  >,
) => JSX.Element;
