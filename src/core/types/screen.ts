import { AppRouteName, AuthRouteName, TabRouteName } from '@core/enums';
import { AppStackParamList } from '@core/types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, BottomTabParamList } from './navigator';

export type AuthScreen<Name extends AuthRouteName> = (
  props: NativeStackScreenProps<AuthStackParamList, Name>,
) => JSX.Element;

export type AppScreen<Name extends AppRouteName> = (
  props: NativeStackScreenProps<AppStackParamList, Name>,
) => JSX.Element;

export type TabScreen<Name extends TabRouteName> = (
  props: CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Name>,
    NativeStackScreenProps<AppStackParamList>
  >,
) => JSX.Element;
