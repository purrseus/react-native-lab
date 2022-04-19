import { comparedMemo } from '@utilities';
import React, { useCallback, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

type SpacerPropPrefix = 'h' | 'v';

interface SpacerProps {
  [key: `${SpacerPropPrefix}${number}`]: true;
}

const Spacer = comparedMemo<SpacerProps>(props => {
  const getSpacerDimensions = useCallback((): ViewStyle[] => {
    return Object.keys(props).map(key => ({
      [key[0] === 'v' ? 'height' : 'width']: +key.slice(1),
    }));
  }, [props]);

  const styles = useMemo(getSpacerDimensions, [getSpacerDimensions]);

  return <View style={styles} />;
});

export default Spacer;
