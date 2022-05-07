import { TAB_BAR_HEIGHT } from '@core/constants';
import { compareMemo } from '@utilities';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacer from './Spacer';

interface BottomTabSpacerProps {
  bottomBarHeight?: number;
}

const BottomTabSpacer = compareMemo<BottomTabSpacerProps>(({ bottomBarHeight }) => {
  const { bottom } = useSafeAreaInsets();

  return <Spacer {...{ [`h${bottom / 2 + (bottomBarHeight ?? TAB_BAR_HEIGHT)}`]: true }} />;
});

export default BottomTabSpacer;
