const ReactPrimitives = require('../ReactPrimitives');
const {
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  Touchable,
  Dimensions,
  Easing,
} = require('react-native-web');

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
});

ReactPrimitives.inject({
  Touchable: require('../modules/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
    Touchable
  ),
});
