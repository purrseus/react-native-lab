import { Button, Field, KeyboardAwareScrollView, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { FormProvider } from 'react-hook-form';
import { useFormContainer } from '../containers';
import { FormObject } from '../containers/useFormContainer';

const Form: ProtectedScreen<ProtectedScreenName.Form> = () => {
  const styles = useStyle(createStyles);
  const container = useFormContainer();

  return (
    <StackContainer headerTitle={ProtectedScreenName.Form}>
      <KeyboardAwareScrollView style={styles.scrollView}>
        <FormProvider {...container.formMethods}>
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

          <Field<FormObject, 'checkboxList'>
            type="checkboxList"
            name="usingPhone"
            data={container.checkboxData}
            containerStyle={styles.field}
            itemStyle={globalStyles.flexFill}
          />
        </FormProvider>

        <Spacer h={32} />
        <Button title="Submit" onPress={container.onSubmit} />
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
