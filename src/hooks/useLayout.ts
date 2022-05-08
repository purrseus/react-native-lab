import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = ({ nativeEvent: { layout: layoutRectangle } }: LayoutChangeEvent) => {
    if (!layout) setLayout(layoutRectangle);
  };

  return { layout, handleLayout };
};

export default useLayout;
