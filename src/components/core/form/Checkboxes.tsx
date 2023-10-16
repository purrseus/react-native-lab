/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxItem, CommonFieldProps } from '@core/interfaces';
import { createField } from '@utils';
import { forwardRef, useCallback } from 'react';
import { Text, View, ViewProps } from 'react-native';
import { Style } from 'twrnc/dist/esm/types';
import Checkbox from '../touchable/Checkbox';
import { useTailwind } from '@hooks';

export interface CheckboxesProps<T = any> extends Omit<ViewProps, 'style'>, CommonFieldProps<T[]> {
  data: CheckboxItem<T>[];
  containerStyle?: Style;
  checkboxStyle?: Style;
  itemStyle?: Style;
}

const _Checkboxes = createField<unknown, CheckboxesProps>(
  forwardRef(
    (
      {
        label,
        data,
        value = [],
        onChange,
        containerStyle,
        checkboxStyle,
        itemStyle,
        errorText,
        ...props
      },
      _ref,
    ) => {
      const { tw } = useTailwind();

      const onPress = useCallback(
        (itemValue: CheckboxItem['value']) => () => {
          const isChecked = value.includes(itemValue);
          const currentValue = isChecked
            ? value.filter(v => v !== itemValue)
            : [...value, itemValue];
          onChange?.(currentValue);
        },
        [onChange, value],
      );

      return (
        <View {...(props as ViewProps)} style={containerStyle}>
          {!!label && <Text style={tw`text-sm font-bold mb-1`}>{label}</Text>}

          <View style={tw.style('flex-row', checkboxStyle)}>
            {data.map(item => (
              <Checkbox
                key={item.label}
                {...item}
                onPress={onPress(item.value)}
                isActive={value.includes(item.value)}
                containerStyle={itemStyle}
              />
            ))}
          </View>

          {!!errorText && <Text style={tw`text-red-600 mt-1`}>{errorText}</Text>}
        </View>
      );
    },
  ),
);

const Checkboxes = _Checkboxes as <T = any>(props: CheckboxesProps<T>) => JSX.Element;

export default Checkboxes;
