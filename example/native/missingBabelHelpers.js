/* eslint-disable */

// For some reason, babelHelpers.typeof is not included despite being required by some dependency
// somewhere. Manually including it here to prevent errors
global.babelHelpers = global.babelHelpers || {};
global.babelHelpers.typeof = (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol')
  ? function (obj) { return typeof obj; }
  : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol ? 'symbol' : typeof obj; };
