import { Button, Field, KeyboardAwareScrollView } from '@components/core';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { useTailwind } from '@hooks';
import { withHook } from '@utils';
import { FormProvider } from 'react-hook-form';
import { useFormContainer } from '../containers';
import { View } from 'react-native';

const FormScreen = withHook(
  useFormContainer,
  ({ form, checkboxData, onSubmit, formNames, formLabels }) => {
    const tw = useTailwind();
    const fieldStyle = tw`py-2`;

    return (
      <StackContainer title={ProtectedScreenName.Form}>
        <KeyboardAwareScrollView style={tw`px-4`} contentContainerStyle={tw`gap-y-8`}>
          <View>
            <FormProvider {...form}>
              <Field.TextInput
                name={formNames.firstName}
                label={formLabels.firstName}
                containerStyle={fieldStyle}
              />

              <Field.TextInput
                name={formNames.lastName}
                label={formLabels.lastName}
                containerStyle={fieldStyle}
              />

              <Field.TextInput
                name={formNames.age}
                label={formLabels.age}
                containerStyle={fieldStyle}
              />

              <Field.TextInput
                name={formNames.address}
                label={formLabels.address}
                containerStyle={fieldStyle}
              />

              <Field.TextInput
                name={formNames.gender}
                label={formLabels.gender}
                containerStyle={fieldStyle}
              />

              <Field.Checkboxes
                name={formNames.phones}
                label={formLabels.phones}
                data={checkboxData}
                containerStyle={fieldStyle}
                itemStyle={tw`flex-1`}
              />
            </FormProvider>
          </View>

          <Button title="Submit" onPress={onSubmit} />
        </KeyboardAwareScrollView>
      </StackContainer>
    );
  },
);

export default FormScreen;
