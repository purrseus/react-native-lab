import { Touchable } from '@components/core';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React from 'react';
import { Text } from 'react-native';
import { createShowcaseItemStyles } from '../styles';

interface ShowcaseItemProps {
  title: string;
  onPress: () => void;
}

const ShowcaseItem = compareMemo<ShowcaseItemProps>(({ title, onPress }) => {
  const styles = useStyle(createShowcaseItemStyles);

  return (
    <Touchable onPress={onPress} style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
    </Touchable>
  );
});

export default ShowcaseItem;
