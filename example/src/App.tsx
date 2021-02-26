import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ExpandableSlider from 'react-native-expandable-slider';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  const [value, setValue] = React.useState<number>(800);

  const handleSetValue = React.useCallback(() => {
    setValue(13400);
  }, []);

  const heightRef = React.useRef<number>(94);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradientContainer}
        colors={['#7B61FF', '#DDD6FF', '#FFFFFF']}
        useAngle={true}
        angle={90}
        locations={[0, 0.7396, 1]}
      >
        <ExpandableSlider
          min={800}
          max={20000}
          value={value}
          onSlide={setValue}
          heightRef={heightRef}
        />
      </LinearGradient>

      <TouchableOpacity onPress={handleSetValue}>
        <Text>handleSetValue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 94,
    borderRadius: 12,
  },
  gradientContainer: {
    width: '100%',
    height: 94,
    borderRadius: 12,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
