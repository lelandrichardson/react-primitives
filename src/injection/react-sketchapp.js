const ReactPrimitives = require('../ReactPrimitives');
const Animated = require('animated');
const Easing = require('animated/lib/Easing');
const {
  View,
  Text,
  Image,
  StyleSheet,
  // TODO(lmr): Dimensions
} = require('react-sketchapp');

const TouchableMixin = {
  componentWillUnmount() {},
  touchableGetInitialState() {
    return { touchable: { touchState: undefined, responderID: null } };
  },
  touchableHandleResponderTerminationRequest() { return false; },
  touchableHandleStartShouldSetResponder() { return false; },
  touchableLongPressCancelsPress() { return true; },
  touchableHandleResponderGrant() {},
  touchableHandleResponderRelease() {},
  touchableHandleResponderTerminate() {},
  touchableHandleResponderMove() {},
};

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
    OS: 'sketch',
    Version: 1,
  },
});

ReactPrimitives.inject({
  Touchable: require('../modules/Touchable')(
    Animated,
    StyleSheet,
    ReactPrimitives.Platform,
    TouchableMixin,
  ),
});
