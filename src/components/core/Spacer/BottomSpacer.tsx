import { TAB_BAR_HEIGHT } from '@core/constants';
import { useTailwind } from '@hooks';
import { compareMemo } from '@utils';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSpacerProps {
  type: 'bottomTab' | 'safeArea' | 'halfSafeArea';
}

const getHeights = (bottom: number): Record<BottomSpacerProps['type'], number> => ({
  bottomTab: bottom / 2 + TAB_BAR_HEIGHT,
  safeArea: bottom,
  halfSafeArea: bottom / 2,
});

const BottomSpacer = compareMemo<BottomSpacerProps>(({ type }) => {
  const { tw } = useTailwind();

  return <View style={tw`h-[${getHeights(useSafeAreaInsets().bottom)[type]}px]`} />;
});

export default BottomSpacer;
