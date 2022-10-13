/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareMemo } from '@utilities';
import { ForwardedRef, forwardRef, RefAttributes, RefCallback, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput as RNTextInput } from 'react-native';
import CheckboxList, { CheckboxListProps } from './CheckboxList';
import TextField, { TextFieldProps } from './TextField';

type FieldType = 'text' | 'checkboxList';

type FieldProps = {
  text: TextFieldProps;
  checkboxList: CheckboxListProps;
};

type FieldRef = {
  text: RNTextInput;
  checkboxList: null;
};

type Props<F extends Record<string, any> = {}, T extends FieldType = 'text'> = {
  type: T;
  name: keyof F;
} & FieldProps[T];

const Components: Record<FieldType, any> = {
  text: TextField,
  checkboxList: CheckboxList,
};

const _Field = ({ type, name, ...props }: Props, ref: ForwardedRef<FieldRef[typeof type]>) => {
  const { control } = useFormContext();

  const {
    field: { onChange, value, ref: controllerRef },
    formState: { errors },
  } = useController({ name, control });

  const fieldProps = useMemo<Omit<Props, 'type'>>(
    () => ({
      [type === 'text' ? 'onChangeText' : 'onChange']: onChange,
      errorText: (errors[name] as any)?.message,
      value,
      name,
    }),
    [onChange, type, value, name, errors[name]],
  );

  const refCallback = useCallback<RefCallback<FieldRef[typeof type]>>(
    instance => {
      'current' in ref! ? (ref.current = instance) : ref!(instance);
      controllerRef(instance);
    },
    [controllerRef, ref],
  );

  const FieldComponent = useMemo<
    (p: Omit<Props, 'type'> & RefAttributes<FieldRef[typeof type]>) => JSX.Element
  >(() => Components[type], [type]);

  return <FieldComponent {...props} {...fieldProps} {...(!!ref && { ref: refCallback })} />;
};

const Field = compareMemo<any, Props>(forwardRef(_Field)) as <
  F extends Record<string, any> = {},
  T extends FieldType = 'text',
>(
  props: Props<F, T> & RefAttributes<FieldRef[T]>,
) => JSX.Element;

export default Field;
