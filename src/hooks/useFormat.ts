import {
  DEFAULT_DATE_TIME_FORMAT_TEMPLATE,
  DEFAULT_NUMBER_FORMAT_TEMPLATE,
  languageMap,
} from '@core/constants';
import { DateTimeFormatTemplate, NumberFormatTemplate } from '@core/types';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { useEffect, useState } from 'react';
import useAppSelector from './useAppSelector';

const useFormat = () => {
  const { language } = useAppSelector(state => state.common);
  const [locale, setLocale] = useState(languageMap[language]);

  useEffect(() => {
    setLocale(languageMap[language]);
  }, [language]);

  const dateTimeFormatter = (
    dateTime: Date | string | number,
    formatTemplate?: DateTimeFormatTemplate,
  ) =>
    dayjs(dateTime)
      .locale(locale)
      .format(formatTemplate || DEFAULT_DATE_TIME_FORMAT_TEMPLATE);

  const numberFormatter = (number: number, formatTemplate?: NumberFormatTemplate) =>
    numeral(number).format(formatTemplate || DEFAULT_NUMBER_FORMAT_TEMPLATE);

  return { dateTimeFormatter, numberFormatter };
};

export default useFormat;
