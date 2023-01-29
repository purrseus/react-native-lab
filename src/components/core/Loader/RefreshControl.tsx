import { useTheme } from '@hooks';
import { compareMemo } from '@utilities';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

const RefreshControl = compareMemo<RefreshControlProps>(({ ...props }) => {
  const { color } = useTheme();

  return (
    <RNRefreshControl
      {...props}
      colors={[color.primary, color.secondary]}
      progressBackgroundColor={color.refreshControlBackground}
      tintColor={color.primary}
    />
  );
});

export default RefreshControl;
