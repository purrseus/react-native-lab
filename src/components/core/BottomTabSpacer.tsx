import { TAB_BAR_HEIGHT } from '@core/constants';
import { comparedMemo } from '@utilities';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacer from './Spacer';

interface BottomTabSpacerProps {
  bottomBarHeight?: number;
}

const BottomTabSpacer = comparedMemo<BottomTabSpacerProps>(({ bottomBarHeight }) => {
  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <Spacer
      {...{ [`h${bottom / 2 + (bottomBarHeight ?? TAB_BAR_HEIGHT)}`]: true, [`w${width}`]: true }}
    />
  );
});

export default BottomTabSpacer;
