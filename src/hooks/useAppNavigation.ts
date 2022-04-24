import { RootStackParamList } from '@core/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const useAppNavigation = () => useNavigation<NavigationProp<RootStackParamList>>();

export default useAppNavigation;
