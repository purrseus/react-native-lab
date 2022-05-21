import { AppScreenName, AuthScreenName, TabScreenName } from '@core/enums';
import { AppStackParamList } from '@core/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, BottomTabParamList } from './navigation';

export type AuthScreen<Name extends AuthScreenName> = (
  props: NativeStackScreenProps<AuthStackParamList, Name>,
) => JSX.Element;

export type AppScreen<Name extends AppScreenName> = (
  props: NativeStackScreenProps<AppStackParamList, Name>,
) => JSX.Element;

export type TabScreen<Name extends TabScreenName> = (
  props: CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Name>,
    NativeStackScreenProps<AppStackParamList>
  >,
) => JSX.Element;
