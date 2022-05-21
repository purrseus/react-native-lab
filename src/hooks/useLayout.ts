import { useCallback, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

interface Options {
  flexibleLayout?: boolean;
}

const useLayout = ({ flexibleLayout = false }: Options) => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = useCallback(
    ({ nativeEvent: { layout: layoutRectangle } }: LayoutChangeEvent) => {
      if (!!layout && !flexibleLayout) return;
      setLayout(layoutRectangle);
    },
    [layout, flexibleLayout],
  );

  return { layout, handleLayout };
};

export default useLayout;
