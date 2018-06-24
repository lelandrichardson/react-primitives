const ReactPrimitives = require('../ReactPrimitives');
const {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Easing,
  // TODO: Dimensions. Does that even make sense tho?
} = require('react-vr');

ReactPrimitives.inject({
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform: {
    OS: 'vr',
    Version: 1,
  },
  Touchable: require('../vr/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
  ),
});
