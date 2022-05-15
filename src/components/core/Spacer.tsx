import { compareMemo } from '@utilities';
import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

type SpacerPropPrefix = 'w' | 'h';

interface SpacerProps {
  [key: `${SpacerPropPrefix}${number}`]: true;
  width?: number;
  height?: number;
}

const Spacer = compareMemo<SpacerProps>(props => {
  const styles: ViewStyle[] = useMemo(
    () =>
      Object.keys(props)
        .filter(key => Number.isInteger(+key.slice(-1)))
        .map(key => ({
          [key[0] === 'h' ? 'height' : 'width']: +key.slice(1),
        })),
    [props],
  );

  return <View style={[{ width: props.width, height: props.height }, styles]} />;
});

export default Spacer;
