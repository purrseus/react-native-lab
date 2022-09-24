import { List } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import React from 'react';
import useShowcaseListContainer from '../containers/useShowcaseListContainer';

const ShowcaseList: ProtectedScreen<ProtectedScreenName.ShowcaseList> = props => {
  const styles = useStyle(createStyles);
  const { data, renderItem, ItemSeparatorComponent } = useShowcaseListContainer(props);

  return (
    <StackContainer headerTitle={ProtectedScreenName.ShowcaseList}>
      <List
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollView}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </StackContainer>
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      padding: 16,
    },
  });

export default ShowcaseList;
