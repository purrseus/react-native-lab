/* eslint-disable no-extend-native */

Array.prototype.swap = function (indexA, indexB) {
  const array = [...this];
  array.splice(indexB, 1, array.splice(indexA, 1, array[indexB])[0]);
  return array;
};

export {};
