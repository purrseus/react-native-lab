import dayjs from 'dayjs';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const referenceTypeFormatter = (value: any[] | Record<string, any>, tabWidth = 2) =>
  JSON.stringify(value, null, tabWidth);

export const dateTimeFormatter = (dateTime: Date | string | number, formatTemplate?: string) =>
  dayjs(dateTime).format(formatTemplate || 'DD/MMM/YYYY HH:mm');
