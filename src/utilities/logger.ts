/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { LANGUAGE_MAP } from '@core/constants';
import { Language } from '@core/types';
import dayjs from 'dayjs';
import { referenceTypeFormatter } from './format';

const LOCALE: Language = 'en-US';

export const logger = (message: any) => {
  if (!__DEV__) return;
  console.log(
    `[${dayjs(new Date()).locale(LANGUAGE_MAP[LOCALE]).format('DD/MMM HH:mm:ss:SSS')}]`,
    typeof message === 'object' ? referenceTypeFormatter(message) : message,
  );
};
