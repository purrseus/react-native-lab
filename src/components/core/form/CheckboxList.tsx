/* eslint-disable @typescript-eslint/no-explicit-any */
import { fonts } from '@assets';
import { CheckboxItem, CommonFieldProps, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { useCallback } from 'react';
import { StyleProp, Text, View, ViewProps, ViewStyle } from 'react-native';
import Checkbox from '../Pressable/Checkbox';

export interface CheckboxListProps<T = any> extends Omit<ViewProps, 'style'>, CommonFieldProps {
  data: CheckboxItem<T>[];
  value?: T[];
  onChange?: (value: T[]) => void;
  containerStyle?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
}

const _CheckboxList = ({
  label,
  data,
  value = [],
  onChange,
  containerStyle,
  listStyle,
  itemStyle,
  errorText,
  ...props
}: CheckboxListProps) => {
  const styles = useStyle(createStyles);

  const onPress = useCallback(
    (itemValue: CheckboxItem['value']) => () => {
      onChange?.(
        value.includes(itemValue) ? value.filter(v => v !== itemValue) : [...value, itemValue],
      );
    },
    [onChange, value],
  );

  return (
    <View {...props} style={containerStyle}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.list, listStyle]}>
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

      {!!errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    label: {
      fontSize: 14,
      fontFamily: fonts.quicksandBold,
      marginBottom: 4,
    },
    list: {
      flexDirection: 'row',
    },
    errorText: {
      color: colors.red,
      marginTop: 4,
    },
  });

const CheckboxList = compareMemo<CheckboxListProps>(_CheckboxList) as <T = any>(
  props: CheckboxListProps<T>,
) => JSX.Element;

export default CheckboxList;
