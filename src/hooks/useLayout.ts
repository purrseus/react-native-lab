import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  const handleLayout = ({ nativeEvent: { layout: layoutRectangle } }: LayoutChangeEvent) => {
    const isInitialLayout = Object.values(layout).every(el => !el);
    if (isInitialLayout) setLayout(layoutRectangle);
  };

  return { handleLayout, ...layout };
};

export default useLayout;
