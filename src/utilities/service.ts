/* eslint-disable @typescript-eslint/no-explicit-any */
interface File {
  uri: string;
  name: string;
  type: string;
}
type FormDataObject = Record<
  string,
  string | number | boolean | Record<string, any> | File | File[]
>;

export const createFormData = (data: FormDataObject) => {
  const formData = new FormData();
  const arrayData = Object.entries(data);
  if (!arrayData.length) return data;

  for (const [key, value] of arrayData) {
    if (Array.isArray(value)) {
      const formDataKey = key.slice(-2) === '[]' ? key : `${key}[]`;
      value.forEach(v => {
        formData.append(formDataKey, v);
      });
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};
