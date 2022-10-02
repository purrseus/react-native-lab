import { Dispatch, SetStateAction } from 'react';
import { ImageRequireSource } from 'react-native';

export interface CommonFieldProps {
  label?: string;
  errorText?: string;
}

export interface HeaderAction {
  icon: ImageRequireSource;
  size?: number;
  onPress: () => void;
}

export interface ActionSheetMethods {
  show: () => void;
  /** @platform android */
  hide: () => void;
}

export interface ImagePickerMethods {
  pick: () => void;
  replace: (replaceIndex: number) => void;
  delete: (deleteIndex?: number) => void;
}

export interface OverlayLoadingMethods {
  show: Dispatch<SetStateAction<boolean>>;
}
