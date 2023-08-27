/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from 'react';
import { ImageRequireSource } from 'react-native';

export interface CommonFieldProps<T = any, I = false> {
  name: string;
  label?: string;
  errorText?: string;
  value?: T;
  onChange?: I extends true ? unknown : (value: T) => void;
  onChangeText?: I extends true ? (text: T) => void : unknown;
}

export interface AppBarAction {
  icon: ImageRequireSource;
  size?: number;
  onPress: () => void;
}

export interface CheckboxItem<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface OverlayLoadingMethods {
  show: Dispatch<SetStateAction<boolean>>;
}

export interface DateTimePickerMethods {
  show: () => void;
}
