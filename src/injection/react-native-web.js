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

// TODO: figure out a more appropriate way to get StyleSheet.resolve, or potentially remove the
// API alltogether.
function getDefault(m) {
  return m.__esModule === true ? m.default : m;
}
const StyleRegistry = getDefault(require('react-native-web/dist/exports/StyleSheet/registry'));

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
});

ReactPrimitives.inject({
  Touchable: require('../modules/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
    Touchable.Mixin,
  ),
});
