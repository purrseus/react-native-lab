import { RootStackParamList } from '@core/types';
import { createNavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './stacks/RootStack';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export default RootNavigator;
