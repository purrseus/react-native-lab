import { PressArea } from '@components/core';
import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import React from 'react';
import { Text, View } from 'react-native';
import { useRegisterContainer } from '../containers';

const Register: UnprotectedScreen<UnprotectedScreenName.Register> = props => {
  const { goBack } = useRegisterContainer(props);

  return (
    <View style={globalStyles.flexFillCenter}>
      <PressArea onPress={goBack}>
        <Text>Register</Text>
      </PressArea>
    </View>
  );
};

export default Register;
