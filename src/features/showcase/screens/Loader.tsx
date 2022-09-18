import { Button } from '@components/core';
import { StackContainer } from '@components/custom';
import { globalStyles } from '@themes';
import React from 'react';
import { useLoaderContainer } from '../containers';

const Loader = () => {
  const { handleOverlayLoading } = useLoaderContainer();

  return (
    <StackContainer headerTitle="Loader" wrapperStyle={globalStyles.flexFillCenter}>
      <Button title="Show OverlayLoading in 3 seconds" onPress={handleOverlayLoading} />
    </StackContainer>
  );
};

export default Loader;
