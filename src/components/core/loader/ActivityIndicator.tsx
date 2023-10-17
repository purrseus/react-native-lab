import { useTailwind } from '@hooks';
import { compareMemo } from '@utils';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from 'react-native';

const ActivityIndicator = compareMemo<ActivityIndicatorProps>(props => {
  const tw = useTailwind();

  return <RNActivityIndicator color={tw.color('emerald-500')} {...props} />;
});

export default ActivityIndicator;
