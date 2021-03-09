import PropTypes from 'prop-types';
import type { FC, MutableRefObject, ReactElement, Reducer } from 'react';
import React from 'react';
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponderInstance,
  ViewProps,
} from 'react-native';
import { PanResponder, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  spring,
  sub,
  timing,
  useValue,
  Value,
} from 'react-native-reanimated';
import { styles } from 'src/ExpandableSlider.styles';
import type { ExpandableSliderProps } from 'src/ExpandableSliderProps';
import { triggerHapticFeedback } from 'src/helpers/trigger-haptic-feedback';
import type {
  LayoutReducerAction,
  LayoutReducerState,
} from 'src/reducers/layout-reducer';
import {
  layoutReducer,
  LayoutReducerActionType,
} from 'src/reducers/layout-reducer';

/**
 * File: ExpandableSlider.tsx
 * @created 2021-02-25 17:22:17
 * @author Thanh Tùng <ht@thanhtunguet.info>
 * @type {FC<ExpandableSliderProps>}
 */
const ExpandableSlider: FC<ExpandableSliderProps> = (
  props: ExpandableSliderProps
): ReactElement => {
  const {
    style,
    indicatorSize,
    min,
    max,
    value,
    useHapticResponse,
    heightRef,
    onSlide,
    onSlideCompleted,
  } = props;

  if (value < min || value > max) {
    throw new Error('Invalid value');
  }

  const sliderRange: number = React.useMemo(() => max - min, [max, min]);

  const borderRadius: number = React.useMemo(() => indicatorSize / 2, [
    indicatorSize,
  ]);

  const handleCalculatePercentage = React.useCallback(
    (v: number) => {
      const current: number = v - min;
      return (current / sliderRange) * 100;
    },
    [min, sliderRange]
  );

  const [{ width: layoutWidth, x: layoutX }, dispatch] = React.useReducer<
    Reducer<LayoutReducerState, LayoutReducerAction>
  >(layoutReducer, {});

  const widthRef: MutableRefObject<number> = React.useRef<number>(0);

  const xRef: MutableRefObject<number> = React.useRef<number>(0);

  const slideableWidthRef: MutableRefObject<number> = React.useRef<number>(0);

  const animatedX: Value<number> = useValue<number>(borderRadius);

  const animatedHeight: Value<number> = useValue<number>(indicatorSize);

  const handleAnimatedHeight = React.useCallback(
    (v: number) => {
      timing(animatedHeight, {
        toValue: new Value(v),
        easing: Easing.ease,
        duration: 50,
      }).start();
    },
    [animatedHeight]
  );

  React.useEffect(() => {
    if (layoutWidth > 0 && max > min) {
      spring(animatedX, {
        toValue: new Value(
          ((value - min) / sliderRange) * slideableWidthRef.current +
            borderRadius
        ),
        damping: 7,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [
    animatedX,
    borderRadius,
    max,
    min,
    sliderRange,
    value,
    layoutWidth,
    layoutX,
  ]);

  const handleLayout: ViewProps['onLayout'] = React.useCallback(
    (event: LayoutChangeEvent) => {
      const { width, x } = event.nativeEvent.layout;
      widthRef.current = width;
      xRef.current = x;
      slideableWidthRef.current = width - indicatorSize;
      dispatch({
        type: LayoutReducerActionType.update,
        width,
        x,
      });
    },
    [indicatorSize]
  );

  const handleSetAnimatedValue = React.useCallback(
    (v: number) => {
      animatedX.setValue(v);
    },
    [animatedX]
  );

  const handleResponderEvent = React.useCallback(
    (event: GestureResponderEvent, isCompleted: boolean = false) => {
      const { pageX } = event.nativeEvent;
      let locationX: number = pageX - xRef.current;
      if (locationX <= borderRadius) {
        locationX = borderRadius;
      }
      if (locationX >= slideableWidthRef.current + borderRadius) {
        locationX = widthRef.current - borderRadius;
      }
      const newValue: number =
        ((locationX - borderRadius) / slideableWidthRef.current) * sliderRange +
        min;

      handleSetAnimatedValue(locationX);

      const percentage: number = handleCalculatePercentage(newValue);

      if (isCompleted) {
        if (typeof onSlideCompleted === 'function') {
          onSlideCompleted(newValue, percentage);
        }
      }

      if (typeof onSlide === 'function') {
        onSlide(newValue, percentage);
      }
    },
    [
      borderRadius,
      handleCalculatePercentage,
      handleSetAnimatedValue,
      min,
      onSlide,
      onSlideCompleted,
      sliderRange,
    ]
  );

  const panResponder: PanResponderInstance = React.useRef<PanResponderInstance>(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderGrant: (event: GestureResponderEvent) => {
        if (useHapticResponse) {
          triggerHapticFeedback();
        }
        if (heightRef?.current) {
          handleAnimatedHeight(heightRef.current);
        }
        handleResponderEvent(event);
      },
      onPanResponderMove: (event: GestureResponderEvent) => {
        handleResponderEvent(event);
      },
      onPanResponderRelease: (event: GestureResponderEvent) => {
        handleResponderEvent(event, true);
        if (heightRef?.current) {
          handleAnimatedHeight(indicatorSize);
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[styles.container, StyleSheet.flatten(style)]}
      {...panResponder.panHandlers}
      onLayout={handleLayout}
    >
      <Animated.View
        style={[
          styles.track,
          {
            height: animatedHeight,
            borderRadius,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: indicatorSize,
              height: animatedHeight,
              borderRadius,
              transform: [
                {
                  translateX: sub(animatedX, borderRadius),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
};

ExpandableSlider.defaultProps = {
  indicatorSize: 24,
  useHapticResponse: true,
};

ExpandableSlider.propTypes = {
  indicatorSize: PropTypes.number,
  useHapticResponse: PropTypes.bool,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number,
  onSlide: PropTypes.func,
  onSlideCompleted: PropTypes.func,
};

ExpandableSlider.displayName = 'ExpandableSlider';

export default ExpandableSlider;
