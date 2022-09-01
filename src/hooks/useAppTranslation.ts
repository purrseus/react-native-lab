import { DEFAULT_NAMESPACE } from '@core/constants';
import { I18nText, Language } from '@core/types';
import { useTranslation } from 'react-i18next';

const useAppTranslation = (keyPrefix?: I18nText) =>
  useTranslation(
    keyPrefix ? (DEFAULT_NAMESPACE as Language) : undefined,
    keyPrefix ? { keyPrefix } : undefined,
  );

export default useAppTranslation;
