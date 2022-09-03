import { Language } from '@core/types';
import { DefaultNamespace, KeyPrefix, Namespace, useTranslation } from 'react-i18next';

const useAppTranslation = <
  N extends Namespace = DefaultNamespace<Language>,
  TKPrefix extends KeyPrefix<N> = undefined,
>(
  keyPrefix: TKPrefix,
) =>
  useTranslation<N, TKPrefix>('en-US' as N, {
    keyPrefix,
  });

export default useAppTranslation;
