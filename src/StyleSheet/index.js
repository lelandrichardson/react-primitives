const getHairlineWidth = require('./getHairlineWidth');
const transformToWebStyle = require('./transformToWebStyle');
const { registerStyle, getStyle, getClassNames } = require('./registry');
const init = require('./initialStyles');

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

// flattening, including registered styles (used for the public `flatten` method)
const flattenStyle = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => assignStyle(acc, flattenStyle(val)), {});
  } else if (typeof input === 'number') {
    return getStyle(input);
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return input;
};

// flattening, but ignores registered styles because those end up as classnames
const flattenNonRegisteredStyles = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => assignStyle(acc, flattenNonRegisteredStyles(val)), {});
  } else if (typeof input === 'number') {
    return undefined;
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return input;
};

const flattenClassNames = (input) => {
  if (Array.isArray(input)) {
    return input.map(flattenClassNames).filter(x => !!x).join(' ') || null;
  } else if (typeof input === 'number') {
    return getClassNames(input);
  }
  return null;
};

const resolve = (styles, extraClassName) => {
  const classes = flattenClassNames(styles);
  const style = flattenNonRegisteredStyles(styles);
  return {
    className: !classes ? extraClassName : `${extraClassName} ${classes}`,
    style: style ? transformToWebStyle(style) : null,
  };
};

const returnCopy = (original, result) => original === result ? Object.assign({}, result) : result;

init();

// TODO(lmr):
// figure out a good strategy for SSR here.

module.exports = {
  hairlineWidth: getHairlineWidth(),
  absoluteFill: registerStyle('absoluteFill', {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }),
  create,
  // NOTE:
  // `flatten` is exported separately from `resolve` because it mimics the RN api more closely
  // than `resolve`.
  flatten: style => returnCopy(style, flattenStyle(style)) || {},

  // TODO(lmr): should this be an internal API or something that we expose?
  resolve,

  // NOTE: direct use of this method is for testing only...
  //reset: () => {
  //  _id = 0;
  //  declarationRegistry = {};
  //  pseudoStyleRegistry = {};
  //  mediaQueryRegistry = {};
  //},

  // renderToStringWithStyles: () => {},
};
