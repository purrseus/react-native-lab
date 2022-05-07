import { compareMemo } from '@utilities';
import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

type SpacerPropPrefix = 'w' | 'h';

interface SpacerProps {
  [key: `${SpacerPropPrefix}${number}`]: true;
}

const Spacer = compareMemo<SpacerProps>(props => {
  const styles: ViewStyle[] = useMemo(
    () =>
      Object.keys(props).map(key => ({
        [key[0] === 'h' ? 'height' : 'width']: +key.slice(1),
      })),
    [props],
  );

  return <View style={styles} />;
});

export default Spacer;
