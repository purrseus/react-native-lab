import { InfiniteList } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';
import { useListContainer } from '../containers';

const List: ProtectedScreen<ProtectedScreenName.List> = () => {
  const container = useListContainer();

  return (
    <StackContainer headerTitle={ProtectedScreenName.List}>
      <InfiniteList
        renderItem={container.renderItem}
        requestCallback={container.getPhotos}
        config={container.config}
      />
    </StackContainer>
  );
};

export default List;
