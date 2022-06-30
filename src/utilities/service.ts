/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from '@core/interfaces';
import { platformSelect } from './os';

type FormDataObject = Record<
  string,
  string | number | boolean | Record<string, any> | File | File[]
>;

const FILE_PREFIX = 'file://';
const FILE_KEYS: (keyof File)[] = ['uri', 'name', 'type'];

// TODO: test array FromData
export const createFormData = (data: FormDataObject): FormData => {
  const formData = new FormData();
  const arrayData = Object.entries(data);
  if (!arrayData.length) return formData;

  const isFile = (param: any): param is File =>
    typeof param === 'object' && FILE_KEYS.every(fileKey => fileKey in param);

  const platformFile = (file: File): File => ({
    ...file,
    uri: platformSelect(file.uri, file.uri.replace(FILE_PREFIX, '')) || '',
  });

  for (const [key, value] of arrayData) {
    if (Array.isArray(value)) {
      const formDataKey = key.endsWith('[]') ? key : `${key}[]`;
      value.forEach(val => {
        formData.append(formDataKey, platformFile(val));
      });
    } else if (isFile(value)) {
      formData.append(key, platformFile(value));
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};
