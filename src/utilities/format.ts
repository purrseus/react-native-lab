/* eslint-disable @typescript-eslint/no-explicit-any */
export const referenceTypeFormatter = (value: any[] | Record<string, any>, tabWidth = 2) =>
  JSON.stringify(value, null, tabWidth);
