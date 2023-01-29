import { Image, Row, Spacer, Text } from '@components/core';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { createShadow } from '@utilities';
import { View } from 'react-native';
import { Photos } from '../services/adapters';

const Item = ({ thumbnailUrl, ...props }: Photos[number]) => {
  const styles = useStyle(createStyles);

  return (
    <Row style={styles.container}>
      {!!thumbnailUrl && <Image source={{ uri: thumbnailUrl }} style={styles.image} />}

      <Spacer w={16} />

      <View style={globalStyles.flexFill}>
        <Text style={styles.text}>{referenceTypeFormatter(props)}</Text>
      </View>
    </Row>
  );
};

const createStyles = ({ create, color }: StyleCallbackParams) =>
  create({
    container: {
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 16,
      backgroundColor: color.white,
      ...createShadow(color.shadow, [0, 0], 0.1, 8, 16),
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 16,
    },
    text: {
      fontWeight: 'bold',
    },
  });

export default Item;
