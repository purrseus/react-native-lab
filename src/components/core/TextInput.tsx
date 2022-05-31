import { StyleCallbackParams } from '@core/interfaces';
import { I18nText } from '@core/types';
import { useStyle } from '@hooks';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

interface TextInputProps extends RNTextInputProps {
  placeholder?: I18nText;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(({ placeholder, ...props }, ref) => {
  const { t } = useTranslation();
  const styles = useStyle(createStyle);

  return (
    <RNTextInput
      ref={ref}
      allowFontScaling={false}
      placeholderTextColor={styles.placeholder.color}
      selectionColor={styles.selection.color}
      {...props}
      placeholder={placeholder ? (t(placeholder) as string) : undefined}
    />
  );
});

const createStyle = ({ create, colors }: StyleCallbackParams) =>
  create({
    text: {
      color: colors.primaryText,
    },
    placeholder: {
      color: colors.lightGray,
    },
    selection: {
      color: colors.primary,
    },
  });

export default TextInput;
