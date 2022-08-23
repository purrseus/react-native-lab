import { I18nText } from '@core/types';
import { compareMemo } from '@utilities';
import { TOptions } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Text, { TextProps } from './Text';

interface LocalizedTextProps extends TextProps {
  t: I18nText;
  i18nOptions?: TOptions;
}
const LocalizedText = compareMemo<LocalizedTextProps>(({ t, i18nOptions, ...props }) => {
  const { t: translate } = useTranslation();

  return <Text {...props} children={translate(t, i18nOptions) as string} />;
});

export default LocalizedText;
