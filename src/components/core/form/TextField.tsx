import { CommonFieldProps, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React, { forwardRef } from 'react';
import { StyleProp, TextInput as RNTextInput, View, ViewStyle } from 'react-native';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import LocalizedText from '../Text/LocalizedText';

export interface TextFieldProps extends CommonFieldProps, TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
}

const TextField = compareMemo<RNTextInput, TextFieldProps>(
  forwardRef(({ label, errorText, containerStyle, style, ...props }, ref) => {
    const styles = useStyle(createStyles);

    return (
      <View style={containerStyle}>
        {!!label && <LocalizedText t={label} style={styles.label} />}

        <View style={styles.wrapperInput}>
          <TextInput {...props} ref={ref} style={[styles.input, style]} />
        </View>

        {!!errorText && <LocalizedText t={errorText} style={styles.errorText} />}
      </View>
    );
  }),
);

const createStyles = ({ create, colors, fonts }: StyleCallbackParams) =>
  create({
    label: {
      fontSize: 14,
      fontFamily: fonts.quicksandBold,
      marginBottom: 4,
    },
    wrapperInput: {
      paddingHorizontal: 8,
      paddingVertical: 12,
      backgroundColor: colors.lightGray,
      borderRadius: 12,
    },
    input: {},
    errorText: {
      color: colors.red,
      marginTop: 4,
    },
  });

export default TextField;
