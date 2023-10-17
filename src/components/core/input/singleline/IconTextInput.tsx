import { PADDING_VERTICAL_INPUT } from '@core/constants';
import { compareMemo } from '@utils';
import { forwardRef, ReactNode } from 'react';
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, View } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import TextInput from './TextInput';
import { useTailwind } from '@hooks';

export interface IconTextInputProps extends RNTextInputProps {
  IconLeftComponent?: ReactNode;
  IconRightComponent?: ReactNode;
  containerStyle?: Style;
  style?: Style;
}

const IconTextInput = compareMemo<RNTextInput, IconTextInputProps>(
  forwardRef(({ IconLeftComponent, IconRightComponent, containerStyle, style, ...props }, ref) => {
    const tw = useTailwind();

    return (
      <View
        style={tw.style(
          `flex-row items-center px-2 py-[${PADDING_VERTICAL_INPUT}px] bg-zinc-300 rounded-xl gap-x-2`,
          containerStyle,
        )}
      >
        {IconLeftComponent}
        <TextInput {...props} ref={ref} style={tw.style('flex-1', style)} />
        {IconRightComponent}
      </View>
    );
  }),
);

export default IconTextInput;
