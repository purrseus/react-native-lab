import { Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useHomeContainer } from '../containers';

const Home = withHook(useHomeContainer, ({ goToShowcase }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text onPress={goToShowcase}>Home</Text>
    </View>
  );
});

export default Home;
