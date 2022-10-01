import { Spacer, Text, PressArea } from '@components/core';
import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import { View } from 'react-native';
import { useLoginContainer } from '../containers';

const Login: UnprotectedScreen<UnprotectedScreenName.Login> = props => {
  const { handleLogin, navigateToRegister } = useLoginContainer(props);

  return (
    <View style={globalStyles.flexFillCenter}>
      <PressArea onPress={handleLogin}>
        <Text>Login</Text>
      </PressArea>

      <Spacer h={32} />

      <PressArea onPress={navigateToRegister}>
        <Text>Go to Register</Text>
      </PressArea>
    </View>
  );
};

export default Login;
