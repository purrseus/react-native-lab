import { RootStackParamList } from '@core/types';
import { createNavigationContainerRef } from '@react-navigation/native';

export { default as RootNavigator } from './stacks/RootNavigator';
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
