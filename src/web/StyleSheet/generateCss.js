const normalizeValue = require('./normalizeValue');
const hyphenate = require('./hyphenate');
const mapKeyValue = require('../util/mapKeyValue');
const transformToWebStyle = require('./transformToWebStyle');

/**
 * Generates valid CSS rule bodies (sans selector) from a JS object
 *
 * Example:
 * ```
 * generateCss({ width: 20, color: 'blue' });
 * //=> 'width:20px;color:blue;'
 * ```
 *
 * @param style
 */
const generateCss = style => mapKeyValue(transformToWebStyle(style), (key, val) => {
  const name = hyphenate(key);
  const value = normalizeValue(key, val);
  if (Array.isArray(val)) {
    return val.map(v => `${name}:${v};`).join('');
  }
  return `${name}:${value};`;
}).join('');

module.exports = generateCss;
