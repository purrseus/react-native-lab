import { I18nText, I18nType } from '@core/types';
import i18n from '@i18n';
import { Alert as RNAlert, AlertButton as RNAlertButton } from 'react-native';

export interface AlertButton extends RNAlertButton {
  text?: I18nText;
}

const Alert = (title: I18nType, message?: I18nType, buttons?: AlertButton[]) => {
  const localizedTitle =
    typeof title === 'string' ? i18n.t(title) : i18n.t(title.key, title.options);

  const localizedMessage = !message
    ? undefined
    : typeof message === 'string'
    ? i18n.t(message)
    : i18n.t(message.key, message.options);

  const localizedButtons = buttons
    ? buttons.map<RNAlertButton>(button => ({
        ...button,
        text: button.text ? i18n.t(button.text) : button.text,
      }))
    : undefined;

  RNAlert.alert(localizedTitle, localizedMessage, localizedButtons, {
    cancelable: false,
  });
};

export default Alert;
