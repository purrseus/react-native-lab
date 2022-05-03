import { Text, Touchable } from '@components/core';
import { useAppDispatch } from '@hooks';
import { authActions } from '@store/slices/auth';
import { globalStyles } from '@themes';
import React from 'react';
import { View } from 'react-native';

const Login = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={globalStyles.flexCenter}>
      <Text>Login</Text>
      <Touchable onPress={() => dispatch(authActions.setToken({ accessToken: 'adsd' }))}>
        <Text>asdsdad</Text>
      </Touchable>
    </View>
  );
};

export default Login;
