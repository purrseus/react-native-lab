import { CommonFieldProps } from '@core/interfaces';
import { createField } from '@utils';
import { RefAttributes, forwardRef } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import MultilineTextInput, { MultilineTextInputProps } from '../input/multiline/MultilineTextInput';
import IconTextInput, { IconTextInputProps } from '../input/singleline/IconTextInput';
import Text from '../text/Text';
import { useTailwind } from '@hooks';

type MixinTextInputProps<T extends boolean = false> = (T extends true
  ? MultilineTextInputProps
  : IconTextInputProps) &
  CommonFieldProps<string, true>;

type TextInputProps<T extends boolean = false> = {
  multiline?: T;
  wrapperStyle?: Style;
} & MixinTextInputProps<T>;

const _TextInput = createField<RNTextInput, TextInputProps>(
  forwardRef(
    ({ label, errorText, placeholder, multiline, containerStyle, wrapperStyle, ...props }, ref) => {
      const tw = useTailwind();
      const TextInputComponent = multiline ? MultilineTextInput : IconTextInput;

      return (
        <View style={containerStyle}>
          {!!label && <Text style={tw`text-sm font-bold mb-1`}>{label}</Text>}
          <TextInputComponent
            {...props}
            ref={ref}
            placeholder={placeholder || label}
            containerStyle={wrapperStyle}
          />
          {!!errorText && <Text style={tw`text-red-600 mt-1`}>{errorText}</Text>}
        </View>
      );
    },
  ),
  true,
);

const TextInput = _TextInput as <T extends boolean = false>(
  props: TextInputProps<T> & RefAttributes<RNTextInput>,
) => JSX.Element;

export default TextInput;
