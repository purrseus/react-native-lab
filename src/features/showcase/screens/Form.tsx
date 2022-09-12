import { Button, Field, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormContainer } from '../containers';
import { FormObject } from '../containers/useFormContainer';

const Form = () => {
  const styles = useStyle(createStyles);
  const { formMethods, onSubmit } = useFormContainer();

  return (
    <StackContainer headerTitle="Form">
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <FormProvider {...formMethods}>
          <Field<FormObject>
            type="text"
            name="firstName"
            label="firstName"
            containerStyle={styles.field}
          />

          <Field<FormObject>
            type="text"
            name="lastName"
            label="lastName"
            containerStyle={styles.field}
          />

          <Field<FormObject> type="text" name="age" label="age" containerStyle={styles.field} />

          <Field<FormObject>
            type="text"
            name="address"
            label="address"
            containerStyle={styles.field}
          />

          <Field<FormObject>
            type="text"
            name="gender"
            label="gender"
            containerStyle={styles.field}
          />
        </FormProvider>

        <Spacer h={32} />
        <Button title="Submit" onPress={onSubmit} />
      </KeyboardAwareScrollView>
    </StackContainer>
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingHorizontal: 16,
    },
    field: {
      paddingVertical: 8,
    },
  });

export default Form;
