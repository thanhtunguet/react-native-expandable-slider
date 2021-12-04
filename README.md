# react-native-expandable-slider

_Phillips Hue dimming slider_

![screenshot](https://im.ge/i/uQh80)

## Installation

```sh
npm install react-native-expandable-slider
```

## Usage

View [Online Demo](https://snack.expo.io/@thanhtunguet/react-native-expandable-slider) Snack

If you place this component inside ScrollView, please set `canCancelContentTouches={false}` for ScrollView container

See [https://stackoverflow.com/questions/51705343/react-native-using-a-panresponder-inside-of-a-scrollview-broken-on-android](https://stackoverflow.com/questions/51705343/react-native-using-a-panresponder-inside-of-a-scrollview-broken-on-android)

```tsx
import ExpandableSlider from 'react-native-expandable-slider';

function Example() {
  return (
    <ExpandableSlider
      min={800}
      max={20000}
      value={value}
      onSlide={handleValueChange}
      heightRef={heightRef}
      style={styles.slider}
    />
  );
}
```

### Props

```tsx
interface ExpandableSliderProps {
  /**
   * Size of the slider indicator (px)
   *
   * @type {number}
   */
  indicatorSize?: number;

  /**
   * Min value the slider will emit
   *
   * @type {number}
   */
  min?: number;

  /**
   * Max value the slider will emit
   *
   * @type {number}
   */
  max?: number;

  /**
   * Current value to display
   *
   * @type {number}
   */
  value?: number;

  /**
   * The slider outer style
   *
   * @type {StyleProp<ViewStyle>}
   */
  style?: ViewProps['style'];

  /**
   * Trigger a haptic response when user touch the slider
   *
   * @type {boolean}
   */
  useHapticResponse?: boolean;

  /**
   * A mutable ref object of type number,
   * let the slider know how wide it will expand
   */
  heightRef?: MutableRefObject<number>;

  /**
   * Emit new value while sliding
   *
   * @type {(value: number) => (void | Promise<void>)}
   */
  onSlide?: OnSliderChange;

  /**
   * Emit new value when sliding completed
   *
   * @type {(value: number) => (void | Promise<void>)}
   */
  onSlideCompleted?: OnSliderChange;

  /**
   * Velocity of the slider animation
   */
  slidingVelocity?: number;

  /**
   * Slider's height animated duration
   */
  heightAnimatedDuration?: number;
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
