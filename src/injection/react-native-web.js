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
  TextInput,
} = require('react-native-web');
const StyleRegistry = require('react-native-web/dist/apis/StyleSheet/registry');

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
  TextInput,
});

ReactPrimitives.inject({
  Touchable: require('../modules/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
    Touchable.Mixin,
  ),
});
