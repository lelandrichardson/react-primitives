const ReactPrimitives = require('../ReactPrimitives');
const {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Easing,
  Dimensions,
  TextInput,
} = require('react-native');

ReactPrimitives.inject({
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform: {
    OS: Platform.OS,
    Version: Platform.Version,
  },
  Dimensions,
  TextInput,
  Touchable: require('../modules/Touchable')(Animated, StyleSheet, Platform),
});
