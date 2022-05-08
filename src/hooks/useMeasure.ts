import { Measure } from '@core/interfaces';
import { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const useMeasure = <T extends TouchableOpacity | View>() => {
  const ref = useRef<T | null>(null);
  const [measure, setMeasure] = useState<Measure | null>(null);

  useEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) =>
      setMeasure({ x, y, width, height, pageX, pageY }),
    );
  }, []);

  return { measure, ref };
};

export default useMeasure;
