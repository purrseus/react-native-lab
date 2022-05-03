/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { referenceTypeFormatter } from './format';

const LOCALE = 'vi-VN';

export const logger = (message: any) => {
  if (!__DEV__) return;
  const date = new Date();

  console.log(
    `[${date.toLocaleDateString(LOCALE)} ${date.toLocaleTimeString(LOCALE)}]`,
    typeof message === 'object' ? referenceTypeFormatter(message) : message,
  );
};
