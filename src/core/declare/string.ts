/* eslint-disable no-extend-native */

String.prototype.isEmpty = function () {
  return !this.trim().length;
};

export {};
