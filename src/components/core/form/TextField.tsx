import { CommonFieldProps, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React, { ForwardedRef, forwardRef, RefAttributes } from 'react';
import { StyleProp, TextInput as RNTextInput, View, ViewStyle } from 'react-native';
import MultilineTextInput, {
  MultilineTextInputProps,
} from '../Text/Input/Multiline/MultilineTextInput';
import IconTextInput, { IconTextInputProps } from '../Text/Input/Singleline/IconTextInput';
import Text from '../Text/Text';

type CombinedTextInputProps<T extends boolean = false> = (T extends true
  ? MultilineTextInputProps
  : IconTextInputProps) &
  CommonFieldProps;

export type TextFieldProps<T extends boolean = false> = {
  multiline?: T;
  wrapperStyle?: StyleProp<ViewStyle>;
} & CombinedTextInputProps<T>;

const _TextField = (
  {
    label,
    errorText,
    placeholder,
    multiline,
    containerStyle,
    wrapperStyle,
    ...props
  }: TextFieldProps,
  ref: ForwardedRef<RNTextInput>,
) => {
  const styles = useStyle(createStyles);
  const TextInputComponent = multiline ? MultilineTextInput : IconTextInput;

  return (
    <View style={containerStyle}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInputComponent
        {...props}
        ref={ref}
        placeholder={placeholder || label}
        containerStyle={wrapperStyle}
      />
      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const createStyles = ({ create, colors, fonts }: StyleCallbackParams) =>
  create({
    label: {
      fontSize: 14,
      fontFamily: fonts.quicksandBold,
      marginBottom: 4,
    },
    errorText: {
      color: colors.red,
      marginTop: 4,
    },
  });

const TextField = compareMemo<RNTextInput, TextFieldProps>(forwardRef(_TextField)) as <
  T extends boolean,
>(
  props: TextFieldProps<T> & RefAttributes<RNTextInput>,
) => JSX.Element;

export default TextField;
