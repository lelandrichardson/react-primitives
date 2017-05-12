// This is an injection script for the (now deprecated) implementation of the web target of
// react primitives. We are now moving towards react-native-web as the web target implementation.
require('../web/Touchable/injectResponderEventPlugin');

const ReactPrimitives = require('../ReactPrimitives');
const Animated = require('animated');
const Easing = require('animated/lib/Easing');

const View = require('../web/View/View');
const Text = require('../web/Text/Text');
const Image = require('../web/Image/Image');
const StyleSheet = require('../web/StyleSheet');
const TouchableMixin = require('../web/Touchable/TouchableMixin');

Animated.inject.FlattenStyle(StyleSheet.flatten);

ReactPrimitives.inject({
  StyleSheet,
  View,
  Text,
  Image,
  Easing,
  Animated: {
    ...Animated,
    View: Animated.createAnimatedComponent(View),
    Text: Animated.createAnimatedComponent(Text),
    Image: Animated.createAnimatedComponent(Image),
  },
  Platform: {
    OS: 'web',
    Version: 1,
  },
  // Dimensions,
});

ReactPrimitives.inject({
  Touchable: require('../modules/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
    TouchableMixin
  ),
});
