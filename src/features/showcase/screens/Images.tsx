import { Icon, Image, Spacer, Text } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { View } from 'react-native';
import { useImageContainer } from '../containers';

const Images: ProtectedScreen<ProtectedScreenName.Images> = () => {
  const styles = useStyle(createStyles);
  const container = useImageContainer();

  return (
    <StackContainer
      headerTitle={ProtectedScreenName.Images}
      wrapperType="scrollView"
      wrapperStyle={[globalStyles.flexCenter, styles.scrollView]}
    >
      <Text>Image</Text>
      <Image source={container.imageUrl} style={styles.image} />

      <Spacer h={60} />

      <Text>Cached Image</Text>
      <Image cached source={container.imageUrl} style={styles.image} />

      <Spacer h={60} />

      <Text>Icon</Text>
      <Icon source={container.imageUrl} size={24} />
      <View />
    </StackContainer>
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
    image: {
      width: 200,
      height: 200,
    },
  });

export default Images;
