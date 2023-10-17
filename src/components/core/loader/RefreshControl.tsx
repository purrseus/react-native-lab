import { useTailwind } from '@hooks';
import { compareMemo } from '@utils';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

const RefreshControl = compareMemo<RefreshControlProps>(({ ...props }) => {
  const tw = useTailwind();

  return (
    <RNRefreshControl
      {...props}
      colors={[tw.color('emerald-500'), tw.color('green-500')] as string[]}
      progressBackgroundColor={tw.color('zinc-50')}
      tintColor={tw.color('emerald-500')}
    />
  );
});

export default RefreshControl;
