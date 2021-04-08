import React from 'react';
import ExpandableSlider from 'react-native-expandable-slider';

it('should render correctly', () => {
  expect(<ExpandableSlider min={0} max={-1} />).toBeTruthy();
});
