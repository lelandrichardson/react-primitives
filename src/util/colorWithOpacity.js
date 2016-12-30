import normalizeColor from './normalizeColor';

const colorWithOpacity = (input, opacity) => {
  const nullableColor = normalizeColor(input);
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;

  const r = Math.round(((colorInt & 0xff000000) >>> 24));
  const g = Math.round(((colorInt & 0x00ff0000) >>> 16));
  const b = Math.round(((colorInt & 0x0000ff00) >>> 8));
  const a = ((colorInt & 0x000000ff) >>> 0) / 255;

  return `rgba(${r},${g},${b},${a * opacity})`;
};

module.exports = colorWithOpacity;
