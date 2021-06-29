import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  track: {
    backgroundColor: 'rgba(0, 0, 0, 0.14)',
  },
  thumb: {
    backgroundColor: '#FFFFFF',
  },
  activeTrack: {
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    overflow: 'hidden',
  },
  activeGradient: {
    width: '100%',
    height: '100%',
  },
});
