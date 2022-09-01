import { compareMemo, platformSelect } from '@utilities';
import React, { forwardRef } from 'react';
import TextInput, { TextInputProps } from '../Singleline/TextInput';
import { StyleProp, TextInput as RNTextInput, View, ViewStyle } from 'react-native';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { MAX_HEIGHT_INPUT, MIN_HEIGHT_INPUT } from '@core/constants';

export interface MultilineTextInputProps extends TextInputProps {
  dynamicHeight?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const MultilineTextInput = compareMemo<RNTextInput, MultilineTextInputProps>(
  forwardRef(({ dynamicHeight = false, style, containerStyle, ...props }, ref) => {
    const styles = useStyle(createStyles);

    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          {...props}
          multiline
          ref={ref}
          style={[
            styles.input,
            styles[dynamicHeight ? 'dynamicHeightInput' : 'expandedInput'],
            style,
          ]}
        />
      </View>
    );
  }),
);

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    container: {
      paddingHorizontal: 8,
      paddingVertical: platformSelect(8.2, 12),
      backgroundColor: colors.lightGray,
      borderRadius: 12,
    },
    input: {
      ...platformSelect({}, { paddingTop: 0 }),
    },
    expandedInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    dynamicHeightInput: {
      height: 'auto',
      minHeight: MIN_HEIGHT_INPUT,
      maxHeight: MAX_HEIGHT_INPUT,
    },
  });

export default MultilineTextInput;
