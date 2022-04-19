import { I18nText } from '@core/types';
import { comparedMemo } from '@utilities';
import { StringMap } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledText, { StyledTextProps } from './StyledText';

interface LocalizedTextProps extends StyledTextProps {
  text: I18nText;
  i18nOptions?: StringMap;
}
const LocalizedText = comparedMemo<LocalizedTextProps>(({ text, i18nOptions, ...props }) => {
  const { t } = useTranslation();

  return <StyledText {...props} text={t(text as I18nText, i18nOptions) as string} />;
});

export default LocalizedText;
