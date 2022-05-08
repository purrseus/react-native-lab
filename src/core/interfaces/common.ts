export interface CommonSize {
  width: number;
  height: number;
}

export interface Measure extends CommonSize {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
}
