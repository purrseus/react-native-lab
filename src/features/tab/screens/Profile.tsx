import { Text } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { View } from 'react-native';
import { useProfileContainer } from '../containers';

const Profile = withHook(useProfileContainer, ({ logout }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <Text onPress={logout}>Profile</Text>
    </View>
  );
});

export default Profile;
