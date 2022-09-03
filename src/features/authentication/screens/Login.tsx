import { Spacer, Text, Touchable } from '@components/core';
import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';
import { useLoginContainer } from '../containers';

const Login: UnprotectedScreen<UnprotectedScreenName.Login> = props => {
  const { handleLogin, navigateToRegister } = useLoginContainer(props);

  return (
    <View style={globalStyles.flexFillCenter}>
      <Touchable onPress={handleLogin}>
        <Text>Login</Text>
      </Touchable>

      <Spacer h={32} />

      <Touchable onPress={navigateToRegister}>
        <Text>Go to Register</Text>
      </Touchable>
    </View>
  );
};

export default Login;
