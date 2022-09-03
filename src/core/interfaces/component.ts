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
