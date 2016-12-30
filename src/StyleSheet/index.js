const getHairlineWidth = require('./getHairlineWidth');
const transformToWebStyle = require('./transformToWebStyle');
const { reset, registerStyle, getStyle, getClassNames } = require('./registry');
const init = require('./initialStyles');
const injector = require('./injector');

// TODO:
// 3. ensure that multiple-bundled react-primitives will work...
// 6. use invariant and add a lot of validation + runtime checks
// 7. introduce a "strict mode" which only allows RN-compatible API (not sure about this any more)
// 12. how to handle custom font families??

const hasOwnProperty = Object.prototype.hasOwnProperty;

const create = styles => {
  const result = {};
  Object.keys(styles).forEach(key => {
    result[key] = registerStyle(key, styles[key]);
  });
  return result;
};

const mergeTransforms = (a, b) => {
  if (!a || a.length === 0) return b; // in this case, a has nothing to contribute.
  const result = [];
  const transformsInA = a.reduce((hash, t) => {
    const key = Object.keys(t)[0];
    result.push(t);
    hash[key] = result.length - 1;
    return hash;
  }, {});
  b.forEach(t => {
    const key = Object.keys(t)[0];
    const index = transformsInA[key];
    if (index !== undefined) {
      result[index] = t;
    } else {
      result.push(t);
    }
  });
  return result;
};

// merge two style hashes together. Sort of like `Object.assign`, but is aware of `transform` as a
// special case.
// NOTE: mutates the first argument!
const assignStyle = (a, b) => {
  let key;
  for (key in b) {
    if (hasOwnProperty.call(b, key)) {
      switch (key) {
        case 'transform':
          a[key] = mergeTransforms(a[key], b[key]);
          break;
        default:
          /* eslint no-param-reassign: 0 */
          a[key] = b[key];
          break;
      }
    }
  }
  return a;
};

const flattenStyle = (input, expandRegisteredStyles) => {
  // optimize for this (common) scenario of input not needing flattening
  if (!Array.isArray(input)) {
    if (typeof input === 'number') {
      return expandRegisteredStyles ? getStyle(input) : undefined;
    }
    if (!input) {
      return undefined;
    }
    return input;
  }
  const result = {};
  let hasResult = false;
  const stack = [{ i: 0, array: input }];
  while (stack.length) {
    const iterator = stack.pop();
    let i = iterator.i;
    const array = iterator.array;
    for (; i < array.length; i++) {
      const el = array[i];
      if (Array.isArray(el)) {
        stack.push({ i: i + 1, array });
        stack.push({ i: 0, array: el });
        break;
      }
      if (typeof el === 'number') {
        if (expandRegisteredStyles) {
          hasResult = true;
          assignStyle(result, getStyle(el));
        }
      } else if (el) {
        hasResult = true;
        assignStyle(result, el);
      }
    }
  }
  return hasResult ? result : undefined;
};

const flattenClassNames = (input, flag) => {
  // optimize for this (common) scenario of input not needing flattening
  if (!Array.isArray(input)) {
    if (typeof input === 'number') {
      return getClassNames(input, 0);
    }
    return null;
  }
  let result = '';
  let position = 0;
  let hasSeenObject = false;
  const stack = [{ i: 0, array: input }];
  while (stack.length) {
    const iterator = stack.pop();
    let i = iterator.i;
    const array = iterator.array;
    for (; i < array.length; i++) {
      const el = array[i];
      if (Array.isArray(el)) {
        stack.push({ i: i + 1, array });
        stack.push({ i: 0, array: el });
        break;
      }
      if (typeof el === 'number') {
        result += `${getClassNames(el, position)} `;
        if (hasSeenObject) {
          // TODO(lmr): warn to console in this case to let user know? or do we not care?
          flag.deopt = true;
        }
      } else if (el) {
        hasSeenObject = true;
      }
      position++;
    }
  }
  return result;
};

const resolve = (styles, extraClassName) => {
  const flag = { deopt: false };
  const classes = flattenClassNames(styles, flag);
  const style = flattenStyle(styles, flag.deopt);
  return {
    className: !classes || flag.deopt ? extraClassName : `${extraClassName} ${classes}`,
    style: style ? transformToWebStyle(style) : null,
  };
};

const returnCopy = (original, result) => {
  if (original === result || typeof original === 'number') {
    return { ...result };
  }
  return result;
};

init();

// TODO(lmr):
// figure out a good strategy for SSR here.

const absoluteFillObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

module.exports = {
  hairlineWidth: getHairlineWidth(),
  absoluteFillObject,
  absoluteFill: registerStyle('absoluteFill', absoluteFillObject),
  create,
  // NOTE:
  // `flatten` is exported separately from `resolve` because it mimics the RN api more closely
  // than `resolve`.
  flatten: style => returnCopy(style, flattenStyle(style, true)) || {},

  // TODO(lmr): should this be an internal API or something that we expose?
  resolve,

  reset,

  getStyleSheetHtml: injector.getStyleSheetHtml,
};
