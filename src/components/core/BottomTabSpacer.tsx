import { TAB_BAR_HEIGHT } from '@core/constants';
import { compareMemo } from '@utilities';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacer from './Spacer';

interface BottomTabSpacerProps {
  heightOffset?: number;
}

const BottomTabSpacer = compareMemo<BottomTabSpacerProps>(({ heightOffset }) => {
  const { bottom } = useSafeAreaInsets();

  return <Spacer height={bottom / 2 + (heightOffset ?? TAB_BAR_HEIGHT)} />;
});

export default BottomTabSpacer;
