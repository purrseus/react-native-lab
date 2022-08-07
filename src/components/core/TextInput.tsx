import { DEFAULT_FONT_SIZE } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';
import { I18nText } from '@core/types';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native';

export interface TextInputProps extends RNTextInputProps {
  placeholder?: I18nText;
}

const TextInput = compareMemo<RNTextInput, TextInputProps>(
  forwardRef(({ placeholder, style, ...props }, ref) => {
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
        style={[styles.input, style]}
      />
    );
  }),
);

const createStyle = ({ create, colors, fonts }: StyleCallbackParams) =>
  create({
    input: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      color: colors.primaryText,
      fontSize: DEFAULT_FONT_SIZE,
      height: DEFAULT_FONT_SIZE + 6,
      fontFamily: fonts.quicksandMedium,
    },
    placeholder: {
      color: colors.darkGray,
    },
    selection: {
      color: colors.primary,
    },
  });

export default TextInput;
