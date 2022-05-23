import { Image, Spacer, Text, InfiniteList } from '@components/core';
import { TabScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { TabScreen } from '@core/types';
import { useAppState, useStyle } from '@hooks';
import { commonAPI } from '@services/requests';
import { globalStyles } from '@themes';
import { compareMemo, logger } from '@utilities';
import React, { useCallback } from 'react';
import { ListRenderItem, View } from 'react-native';

const Item = compareMemo<{
  item: { id: string; download_url: string; author: string };
}>(({ item }) => {
  const styles = useStyle(createStyles);
  logger(`Item ${item?.id}`);

  return (
    <View style={styles.item}>
      <Image
        cached
        source={{ uri: item.download_url.slice(0, -10) + '/100/100' }}
        style={styles.photo}
      />
      <Spacer w8 />
      <Text style={styles.title} onPress={() => null}>
        {item.author}
      </Text>
    </View>
  );
});

const Home: TabScreen<TabScreenName.Home> = () => {
  const renderItem: ListRenderItem<{ id: string; download_url: string; author: string }> =
    useCallback(({ item }) => {
      return <Item item={item} />;
    }, []);

  useAppState(
    () => {
      logger('active');
    },
    () => {
      logger('inactive');
    },
  );

  return (
    <View style={globalStyles.flexFill}>
      <InfiniteList
        ItemSeparatorComponent={() => <Spacer h20 />}
        requestCallback={commonAPI.fetchPhotos}
        config={{ accessProperties: [] }}
        isTabScreen
        renderItem={renderItem}
      />
    </View>
  );
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    item: {
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: 16,
      padding: 8,
      backgroundColor: colors.lightGray,
      borderRadius: 16,
    },
    photo: {
      borderRadius: 16,
      width: 100,
      aspectRatio: 1,
    },
    title: {
      flexShrink: 1,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

export default Home;
