import normalizeColor from 'normalize-css-color';

const colorWithOpacity = (input, opacity) => {
  const nullableColor = normalizeColor(input);
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return `rgba(${r},${g},${b},${a * opacity})`;
};

module.exports = colorWithOpacity;
