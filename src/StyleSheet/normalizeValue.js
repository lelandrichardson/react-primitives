// Taken from:
// https://github.com/necolas/react-native-web/blob/master/src/apis/StyleSheet/normalizeValue.js
const unitlessNumbers = {
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related
  fillOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
};

const normalizeValue = (property, value) => {
  if (!unitlessNumbers[property] && typeof value === 'number') {
    return `${value}px`; // TODO(lmr): what if we used `em` or `rem` here?
  }
  return value;
};

module.exports = normalizeValue;
