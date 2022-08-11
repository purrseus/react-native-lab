import { Touchable } from '@components/core';
import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Text, View } from 'react-native';
import { useRegister } from '../hooks';

const Register: UnprotectedScreen<UnprotectedScreenName.Register> = props => {
  const registerContainer = useRegister(props);

  return (
    <View style={globalStyles.flexFillCenter}>
      <Touchable onPress={registerContainer.goBack}>
        <Text>Register</Text>
      </Touchable>
    </View>
  );
};

export default Register;
