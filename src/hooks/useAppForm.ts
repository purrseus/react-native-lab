import { ValidationObj } from '@core/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { object } from 'yup';

const useAppForm = <T extends FieldValues>(
  validateObj: ValidationObj<T>,
  formOptions?: UseFormProps<T>,
) =>
  useForm<T>({
    resolver: yupResolver(object().shape(validateObj)),
    ...formOptions,
  });

export default useAppForm;
