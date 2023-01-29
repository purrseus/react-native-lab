import { color } from '@themes';
import { compareMemo } from '@utilities';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from 'react-native';

const ActivityIndicator = compareMemo<ActivityIndicatorProps>(props => (
  <RNActivityIndicator color={color.primary} {...props} />
));

export default ActivityIndicator;
