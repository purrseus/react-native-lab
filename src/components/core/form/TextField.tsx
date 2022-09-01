import { CommonFieldProps, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React, { ForwardedRef, forwardRef, RefAttributes } from 'react';
import { StyleProp, TextInput as RNTextInput, View, ViewStyle } from 'react-native';
import LocalizedText from '../Text/LocalizedText';
import MultilineTextInput, {
  MultilineTextInputProps,
} from '../TextInput/Multiline/MultilineTextInput';
import IconTextInput, { IconTextInputProps } from '../TextInput/Singleline/IconTextInput';

type CombinedTextInputProps<T extends boolean = false> = (T extends true
  ? MultilineTextInputProps
  : IconTextInputProps) &
  CommonFieldProps;

export type TextFieldProps<T extends boolean = false> = {
  multiline?: T;
  wrapperStyle?: StyleProp<ViewStyle>;
} & CombinedTextInputProps<T>;

const _TextField = (
  { label, errorText, multiline, containerStyle, wrapperStyle, ...props }: TextFieldProps,
  ref: ForwardedRef<RNTextInput>,
) => {
  const styles = useStyle(createStyles);
  const TextInputComponent = multiline ? MultilineTextInput : IconTextInput;

  return (
    <View style={containerStyle}>
      {!!label && <LocalizedText t={label} style={styles.label} />}
      <TextInputComponent {...props} ref={ref} containerStyle={wrapperStyle} />
      {!!errorText && <LocalizedText t={errorText} style={styles.errorText} />}
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
