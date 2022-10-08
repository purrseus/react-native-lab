declare global {
  interface Array<T> {
    /**
     * Swap position of two elements from an array. Return a swapped array.
     * @param indexA - The fist index of element to swap position
     * @param indexB - The second index of element to swap position
     */
    swap<S extends T>(indexA: number, indexB: number): S[];
  }

  interface String {
    /**
     * Return true if string is empty
     */
    isEmpty(): boolean;
  }
}

export {};
