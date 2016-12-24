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
  scaleX: true,
  scaleY: true,
  scaleZ: true,
  scale: true,
};

const normalizeValue = (property, value) => {
  if (!unitlessNumbers[property] && typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};

module.exports = normalizeValue;
