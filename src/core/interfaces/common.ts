import { CommonSize } from '@core/types';

export interface Measure extends CommonSize {
  x: number;
  y: number;
  pageX: number;
  pageY: number;
}
