//const prefixAll = require('inline-style-prefix-all');
//const processTransform = require('./processTransform');
const expandStyle = require('./expandStyle');
//const hyphenate = require('./hyphenate');


const normalizeStyle = style => expandStyle(style);

module.exports = normalizeStyle;
