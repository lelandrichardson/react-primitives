const ReactPrimitives = require('../ReactPrimitives');
const {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  Easing,
} = require('react-native-web');

ReactPrimitives.inject({
  View,
  Text,
  Image,
  Easing,
  Animated,
  StyleSheet,
  Platform: {
    OS: Platform.OS,
    Version: Platform.Version,
  },
  Dimensions,
  Touchable: TouchableWithoutFeedback,
});
