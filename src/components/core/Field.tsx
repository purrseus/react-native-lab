/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareMemo } from '@utilities';
import React, { ForwardedRef, forwardRef, RefAttributes, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { TextInput as RNTextInput } from 'react-native';
import TextInput, { TextInputProps } from './TextInput';

type FieldType = 'textInput';

type FieldProps = {
  textInput: TextInputProps;
};

type FieldRef = {
  textInput: RNTextInput;
};

type Props<F extends Record<string, any> = {}, T extends FieldType = 'textInput'> = {
  type: T;
  name: keyof F;
} & FieldProps[T];

const Components: Record<FieldType, any> = {
  textInput: TextInput,
};

const _Field = ({ type, name, ...props }: Props, ref: ForwardedRef<FieldRef[typeof type]>) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value, ref: controllerRef },
    fieldState: { error },
  } = useController({ name, control });

  const fieldProps = useMemo<Omit<Props, 'type'>>(
    () => ({
      [type === 'textInput' ? 'onChangeText' : 'onChange']: onChange,
      value,
      name,
    }),
    [onChange, type, value, name],
  );

  const FieldComponent = useMemo<
    (p: Omit<Props, 'type'> & RefAttributes<FieldRef[typeof type]>) => JSX.Element
  >(() => Components[type], [type]);

  return <FieldComponent {...props} {...fieldProps} ref={error ? controllerRef : ref} />;
};

const Field = compareMemo<any, Props>(forwardRef(_Field)) as <
  F extends Record<string, any> = {},
  T extends FieldType = 'textInput',
>(
  props: Props<F, T> & RefAttributes<FieldRef[T]>,
) => JSX.Element;

export default Field;
