import { useTailwind } from '@hooks';
import { compareMemo } from '@utils';
import { StatusBar as RNStatusBar, StatusBarProps } from 'react-native';

const StatusBar = compareMemo<StatusBarProps>(({ ...props }) => {
  const tw = useTailwind();

  return (
    <RNStatusBar
      translucent
      barStyle={tw.prefixMatch('dark') ? 'light-content' : 'dark-content'}
      backgroundColor={tw.color('transparent')}
      {...props}
    />
  );
});

export default StatusBar;
