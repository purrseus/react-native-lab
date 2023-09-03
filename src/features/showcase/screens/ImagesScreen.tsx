import { More } from '@assets/icons';
import { Image, Spacer, Text } from '@components/core';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useImageContainer } from '../containers';

const ImagesScreen = withHook(useImageContainer, ({ imageUrl }) => {
  const styles = useStyle(createStyles);

  return (
    <StackContainer
      title={ProtectedScreenName.Images}
      wrapperType="scrollView"
      wrapperStyle={[globalStyles.flexCenter, styles.scrollView]}
    >
      <Text>Image</Text>
      <Image source={imageUrl} style={styles.image} />

      <Spacer h={60} />

      <Text>Cached Image</Text>
      <Image cached source={imageUrl} style={styles.image} />

      <Spacer h={60} />

      <Text>Icon</Text>
      <More stroke={'red'} />
      <View />
    </StackContainer>
  );
});

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

export default ImagesScreen;
