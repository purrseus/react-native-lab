import { Alert as RNAlert, AlertButton as RNAlertButton } from 'react-native';

export interface AlertButton extends RNAlertButton {
  text?: string;
}

const Alert = (...[title, message, buttons, options]: Parameters<typeof RNAlert.alert>) =>
  RNAlert.alert(title, message, buttons, {
    cancelable: false,
    ...options,
  });

export default Alert;
