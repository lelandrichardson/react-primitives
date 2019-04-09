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

let StyleRegistry = null;
try {
  StyleRegistry = getDefault(require('react-native-web/dist/cjs/exports/StyleSheet/createStyleResolver'))();
} catch (e) {
  StyleRegistry = getDefault(require('react-native-web/dist/cjs/exports/StyleSheet/ReactNativeStyleResolver'));
}

const emptyObject = {};

const resolve = style => {
  return StyleRegistry.resolve(style) || emptyObject;
};

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
