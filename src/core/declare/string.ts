/* eslint-disable no-extend-native */

String.prototype.isEmpty = function () {
  return !this.trim().length;
};

String.prototype.removeSpace = function () {
  return this.replace(/\s+/g, '');
};

export {};
