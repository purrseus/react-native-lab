/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { LANGUAGE_MAP } from '@core/constants';
import dayjs from 'dayjs';
import { referenceTypeFormatter } from './format';
import { platformSelect } from './os';

export const logger = (message: any) => {
  if (!__DEV__) return;
  console.log(
    `${platformSelect('ANDROID', 'IOS')} [${dayjs(new Date())
      .locale(LANGUAGE_MAP['en-US'])
      .format('DD/MM HH:mm:ss:SSS')}]`,
    typeof message === 'object' ? referenceTypeFormatter(message) : message,
  );
};
