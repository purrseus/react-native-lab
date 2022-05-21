import { Measure } from '@core/interfaces';
import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface Options {
  flexiblePosition?: boolean;
}

const useMeasure = <T extends TouchableOpacity | View>({ flexiblePosition = true }: Options) => {
  const ref = useRef<T | null>(null);
  const [measure, setMeasure] = useState<Measure | null>(null);

  useEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      if (!!measure && !flexiblePosition) return;
      setMeasure({ x, y, width, height, pageX, pageY });
    });
  }, [measure, flexiblePosition]);

  return { measure, ref };
};

export default useMeasure;
