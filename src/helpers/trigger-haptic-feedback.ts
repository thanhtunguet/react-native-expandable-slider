import RNHaptic from 'react-native-haptic-feedback';

export function triggerHapticFeedback() {
  RNHaptic.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
}
