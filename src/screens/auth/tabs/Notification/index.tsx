import { BottomTabSpacer, Button, Field, Spacer } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { globalStyles } from '@themes';
import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { object, string } from 'yup';

interface Form {
  name: string;
  password: string;
}

const Notification = () => {
  const form = useForm<Form>(
    useMemo(
      () => ({
        resolver: yupResolver(
          object().shape({
            name: string().required('asd'),
            password: string().required('asdsd'),
          }),
        ),
      }),
      [],
    ),
  );
  const { handleSubmit } = form;

  return (
    <View style={globalStyles.flexFill}>
      <KeyboardAwareScrollView>
        <FormProvider {...form}>
          <Spacer h40 />
          <Field<Form> name="name" type="textInput" style={{ borderWidth: 1 }} />
          <Spacer h40 />
          <Field<Form> name="password" type="textInput" style={{ borderWidth: 1 }} />
          <Spacer h800 />
          <Button title="common.cancel" onPress={handleSubmit(values => console.log(values))} />
        </FormProvider>
        <BottomTabSpacer />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Notification;
