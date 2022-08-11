import { Spacer, Text, Touchable } from '@components/core';
import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';
import { useLogin } from '../hooks';

const Login: UnprotectedScreen<UnprotectedScreenName.Login> = props => {
  const loginContainer = useLogin(props);

  return (
    <View style={globalStyles.flexFillCenter}>
      <Touchable onPress={loginContainer.handleLogin}>
        <Text>Login</Text>
      </Touchable>

      <Spacer h32 />

      <Touchable onPress={loginContainer.navigateToRegister}>
        <Text>Go to Register</Text>
      </Touchable>
    </View>
  );
};

export default Login;
