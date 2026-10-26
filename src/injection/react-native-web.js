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

// TODO: figure out a more appropriate way to get StyleSheet.resolve, or potentially remove the
// API alltogether.
function getDefault(m) {
  return m.__esModule === true ? m.default : m;
}

const emptyObject = {};

let resolve;
try {
  const StyleRegistry = getDefault(require('react-native-web/dist/cjs/exports/StyleSheet/createStyleResolver'))();
  resolve = style => StyleRegistry.resolve(style) || emptyObject;
} catch (e) {
  // react-native-web 0.18+ no longer ships createStyleResolver
  resolve = style => ({ style: StyleSheet.flatten(style) });
}

ReactPrimitives.inject({
  View,
  Text,
  Image,
  Easing,
  Animated,
  StyleSheet: {
    ...StyleSheet,
    resolve,
  },
  Platform: {
    OS: Platform.OS,
    Version: Platform.Version,
  },
  Dimensions,
  Touchable: TouchableWithoutFeedback,
});
