const Animated = require('animated');
const {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} = require('react-sketchapp');

const Touchable = require('./Touchable/Touchable')(Animated, StyleSheet, Platform);

Animated.inject.FlattenStyle(StyleSheet.flatten);

module.exports = {
  Animated: {
    ...Animated,
    View: Animated.createAnimatedComponent(View),
    Text: Animated.createAnimatedComponent(Text),
    Image: Animated.createAnimatedComponent(Image),
  },
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  Platform,
};
