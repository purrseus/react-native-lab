import { InfiniteList } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';
import React from 'react';
import { useListContainer } from '../containers';

const List: ProtectedScreen<ProtectedScreenName.List> = () => {
  const { config, renderItem, getPhotos } = useListContainer();

  return (
    <StackContainer headerTitle={ProtectedScreenName.List}>
      <InfiniteList renderItem={renderItem} requestCallback={getPhotos} config={config} />
    </StackContainer>
  );
};

export default List;
