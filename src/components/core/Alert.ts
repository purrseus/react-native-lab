import { I18nObject } from '@core/interfaces';
import { I18nText } from '@core/types';
import i18n from '@i18n';
import { Alert as RNAlert, AlertButton as RNAlertButton } from 'react-native';

export interface AlertButton extends RNAlertButton {
  text?: I18nText;
}

const Alert = (
  title: I18nText | I18nObject,
  message?: I18nText | I18nObject,
  buttons?: AlertButton[],
) => {
  const localizedTitle = (
    typeof title === 'string' ? i18n.t(title) : i18n.t(title.key, title.options)
  ) as string;

  const localizedMessage = !message
    ? undefined
    : ((typeof message === 'string'
        ? i18n.t(message)
        : i18n.t(message.key, message.options)) as string);

  const localizedButtons = buttons
    ? buttons.map(button => ({ ...button, text: button.text ? i18n.t(button.text) : button.text }))
    : undefined;

  RNAlert.alert(localizedTitle, localizedMessage, localizedButtons as RNAlertButton[], {
    cancelable: false,
  });
};

export default Alert;
