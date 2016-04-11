require('./Touchable/injectResponderEventPlugin');
module.exports = {
  Animated: require('animated'),
  StyleSheet: require('./StyleSheet'),
  View: require('./View/View'),
  Text: require('./Text/Text'),
  Image: require('./Image/Image'),
  Touchable: require('./Touchable/Touchable'),
  // TODO: TextInput: require('./TextInput'),
};
