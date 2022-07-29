import { ProtectedScreenName, TabScreenName, UnprotectedScreenName } from '@core/enums';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList, ProtectedParamList, UnprotectedParamList } from './navigation';

export type ProtectedScreen<Name extends ProtectedScreenName> = (
  props: NativeStackScreenProps<ProtectedParamList, Name>,
) => JSX.Element;

export type UnprotectedScreen<Name extends UnprotectedScreenName> = (
  props: NativeStackScreenProps<UnprotectedParamList, Name>,
) => JSX.Element;

export type TabScreen<Name extends TabScreenName> = (
  props: CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, Name>,
    NativeStackScreenProps<ProtectedParamList>
  >,
) => JSX.Element;
