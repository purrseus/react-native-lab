import { PressArea } from '@components/core';
import { globalStyles } from '@themes';
import { withHook } from '@utilities';
import { Text, View } from 'react-native';
import { useRegisterContainer } from '../containers';

const Register = withHook(useRegisterContainer, ({ goBack }) => {
  return (
    <View style={globalStyles.flexFillCenter}>
      <PressArea onPress={goBack}>
        <Text>Register</Text>
      </PressArea>
    </View>
  );
});

export default Register;
