import { useCallback, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = useCallback(
    ({ nativeEvent: { layout: layoutRectangle } }: LayoutChangeEvent) => {
      if (!layout) setLayout(layoutRectangle);
    },
    [layout],
  );

  return { layout, handleLayout };
};

export default useLayout;
