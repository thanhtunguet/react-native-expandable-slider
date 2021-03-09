import type { MutableRefObject } from 'react';
import type { ViewProps } from 'react-native';

export type OnSliderChange = (value: number, percentage: number) => any;

export interface ExpandableSliderProps {
  indicatorSize?: number;

  min?: number;

  max?: number;

  value?: number;

  style?: ViewProps['style'];

  useHapticResponse?: boolean;

  heightRef?: MutableRefObject<number>;

  onSlide?: OnSliderChange;

  onSlideCompleted?: OnSliderChange;
}
