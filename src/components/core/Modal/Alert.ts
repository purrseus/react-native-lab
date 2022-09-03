import { Alert as RNAlert, AlertButton as RNAlertButton } from 'react-native';

export interface AlertButton extends RNAlertButton {
  text?: string;
}

const Alert = (title: string, message?: string, buttons?: AlertButton[]) =>
  RNAlert.alert(title, message, buttons, {
    cancelable: false,
  });

export default Alert;
