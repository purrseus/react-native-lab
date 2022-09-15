import { InfiniteList } from '@components/core';
import { StackContainer } from '@components/custom';
import React from 'react';
import { useListContainer } from '../containers';

const List = () => {
  const { config, renderItem, getPhotos } = useListContainer();

  return (
    <StackContainer headerTitle="List">
      <InfiniteList renderItem={renderItem} requestCallback={getPhotos} config={config} />
    </StackContainer>
  );
};

export default List;
