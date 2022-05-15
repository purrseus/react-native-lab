/* eslint-disable react-hooks/exhaustive-deps */
import {
  DEFAULT_DATE_TIME_FORMAT_TEMPLATE,
  DEFAULT_NUMBER_FORMAT_TEMPLATE,
  LANGUAGE_MAP,
} from '@core/constants';
import { DateTimeFormatTemplate, NumberFormatTemplate } from '@core/types';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { useCallback } from 'react';
import useAppSelector from './useAppSelector';

const useFormat = () => {
  const { language } = useAppSelector(state => state.common);

  const dateTimeFormatter = useCallback(
    (dateTime: Date | string | number, formatTemplate?: DateTimeFormatTemplate) =>
      dayjs(dateTime)
        .locale(LANGUAGE_MAP[language])
        .format(formatTemplate || DEFAULT_DATE_TIME_FORMAT_TEMPLATE),
    [language],
  );

  const numberFormatter = useCallback(
    (number: number, formatTemplate?: NumberFormatTemplate) =>
      numeral(number).format(formatTemplate || DEFAULT_NUMBER_FORMAT_TEMPLATE),
    [language],
  );

  return { dateTimeFormatter, numberFormatter };
};

export default useFormat;
