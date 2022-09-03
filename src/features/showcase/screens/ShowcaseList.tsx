import { ListView, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { I18nText, ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ShowcaseItem } from '../components';
import { createShowcaseListStyles } from '../styles';

const data = [ProtectedScreenName.BottomSheets];

const ShowcaseList: ProtectedScreen<ProtectedScreenName.ShowcaseList> = ({
  navigation: { navigate },
}) => {
  const styles = useStyle(createShowcaseListStyles);

  const renderItem: ListRenderItem<ProtectedScreenName> = ({ item }) => (
    <ShowcaseItem title={item} onPress={() => navigate(item)} />
  );

  return (
    <StackContainer headerTitle={'ShowcaseList' as I18nText}>
      <ListView
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollView}
        ItemSeparatorComponent={() => <Spacer h={16} />}
      />
    </StackContainer>
  );
};

export default ShowcaseList;
