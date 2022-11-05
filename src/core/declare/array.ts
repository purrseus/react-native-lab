/* eslint-disable no-extend-native */

Object.defineProperty(Array.prototype, 'first', {
  get() {
    return this[0];
  },
});

Object.defineProperty(Array.prototype, 'last', {
  get() {
    return this[this.length - 1];
  },
});

Array.prototype.swap = function (indexA, indexB) {
  const array = [...this];
  const [aElement] = array.splice(indexA, 1, array[indexB]);
  array.splice(indexB, 1, aElement);
  return array;
};

export {};
