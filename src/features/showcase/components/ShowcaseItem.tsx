import { PressArea } from '@components/core';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { Text } from 'react-native';

interface ShowcaseItemProps {
  title: string;
  onPress: () => void;
}

const ShowcaseItem = compareMemo<ShowcaseItemProps>(({ title, onPress }) => {
  const styles = useStyle(createStyles);

  return (
    <PressArea onPress={onPress} style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
    </PressArea>
  );
});

const createStyles = ({ create, fonts, colors }: StyleCallbackParams) =>
  create({
    item: {
      padding: 16,
      backgroundColor: colors.lightGray,
      borderRadius: 8,
      alignItems: 'center',
    },
    itemText: {
      fontSize: 16,
      fontFamily: fonts.quicksandBold,
    },
  });

export default ShowcaseItem;
