import { ValidationObj } from '@core/types';
import { useAppForm } from '@hooks';
import { logger } from '@utilities';
import { useMemo } from 'react';
import { string } from 'yup';

export interface FormObject {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  gender: 'male' | 'female';
}

const useFormContainer = () => {
  const validateObj = useMemo<ValidationObj<FormObject>>(
    () => ({
      firstName: string().required(),
      lastName: string().required(),
      age: string().matches(/\d+/).required(),
      address: string().required(),
      gender: string().oneOf(['Male', 'Female']).required(),
    }),
    [],
  );

  const formMethods = useAppForm<FormObject>(validateObj);

  const onSubmit = formMethods.handleSubmit(values => logger(values));

  return { formMethods, onSubmit };
};

export default useFormContainer;
