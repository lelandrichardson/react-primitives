require('./Touchable/injectResponderEventPlugin');

const Animated = require('animated');
const View = require('./View/View');
const Text = require('./Text/Text');
const Image = require('./Image/Image');
const StyleSheet = require('./StyleSheet');
const Touchable = require('./Touchable/Touchable');

module.exports = {
  Animated: {
    ...Animated,
    View: Animated.createAnimatedComponent(View),
    Text: Animated.createAnimatedComponent(Text),
    Image: Animated.createAnimatedComponent(Image),
  },
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  // TODO: TextInput: require('./TextInput'),
};
