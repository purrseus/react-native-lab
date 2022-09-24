import { Spacer } from '@components/core';
import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { ShowcaseItem } from '../components';

const useShowcaseListContainer = ({
  navigation: { navigate },
}: Parameters<ProtectedScreen<ProtectedScreenName.ShowcaseList>>[0]) => {
  const data = [
    ProtectedScreenName.BottomSheets,
    ProtectedScreenName.Pressable,
    ProtectedScreenName.Form,
    ProtectedScreenName.Images,
    ProtectedScreenName.Layouts,
    ProtectedScreenName.List,
    ProtectedScreenName.Loader,
    ProtectedScreenName.Modals,
    ProtectedScreenName.Spacers,
    ProtectedScreenName.Texts,
  ];

  const renderItem: ListRenderItem<ProtectedScreenName> = ({ item }) => (
    <ShowcaseItem title={item} onPress={() => navigate(item)} />
  );

  const ItemSeparatorComponent = () => <Spacer h={16} />;

  return { data, renderItem, ItemSeparatorComponent };
};

export default useShowcaseListContainer;
