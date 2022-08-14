import { I18nText } from '@core/types';
import { ImageRequireSource } from 'react-native';

export interface CommonFieldProps {
  label?: I18nText;
  errorText?: I18nText;
}

export interface HeaderAction {
  icon: ImageRequireSource;
  size?: number;
  onPress: () => void;
}
