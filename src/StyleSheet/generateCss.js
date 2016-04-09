import prefixAll from 'inline-style-prefix-all';
import processTransform from './processTransform';
import normalizeValue from './normalizeValue';
import expandStyle from './expandStyle';
import hyphenate from './hyphenate';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const mapKeyValue = (obj, fn) => {
  const result = [];
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      result.push(fn(key, obj[key]));
    }
  }
  return result;
};

const normalizeStyle = style => prefixAll(processTransform(expandStyle(style)));

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
const generateCss = style => mapKeyValue(normalizeStyle(style), (key, val) => {
  const name = hyphenate(key);
  const value = normalizeValue(key, val);
  return `${name}:${value};`;
}).join('');

module.exports = generateCss;
