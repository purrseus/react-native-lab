Object.trimValues = function (object) {
  return Object.keys(object).reduce(
    (obj, key) => ({
      ...obj,
      [key]: typeof object[key] === 'string' ? (object[key] as string).trim() : object[key],
    }),
    {} as typeof object,
  );
};

export {};
