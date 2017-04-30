// Taken from:
// https://github.com/necolas/react-native-web/blob/master/src/apis/StyleSheet/hyphenate.js

module.exports = s => s.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^ms-/, '-ms-');
