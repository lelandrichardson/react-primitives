const getHairlineWidth = require('./getHairlineWidth');
const generateCss = require('./generateCss');
const murmurHash = require('./murmurHash');
const injector = require('./injector');
const mapKeyValue = require('../util/mapKeyValue');

// TODO:
// 1. (done) browser-prefixed styles (inline-style-prefixer)
// 2. (done) inject style tags for each style (once and only once)
// 3. ensure that multiple-bundled react-primitives will work...
// 4. (done) conversion of style hash to css...
// 5. (done) hairline width: http://dieulot.net/css-retina-hairline
// 6. use invariant and add a lot of validation + runtime checks
// 7. introduce a "strict mode" which only allows RN-compatible API (not sure about this any more)
// 8. build a react-native implementation...
// 9. figure out interop with css-layout default values...
// 10. (done) make sure it works / process transform properties correctly...
// 11. should we sort the resulting rules? to improve gzippability? does it matter?
// 12. how to handle custom font families??
// 13. refactor this file into sub-files

const hasOwnProperty = Object.prototype.hasOwnProperty;

let _id = 0;
const guid = () => _id++;
const declarationRegistry = {};
const mediaQueryRegistry = {};
const pseudoStyleRegistry = {};

const createCssRule = (key, rule, genCss) => {
  const cssBody = generateCss(rule);
  // key is the media query, eg. '@media (max-width: 600px)'
  const className = `rp_${murmurHash(key + cssBody)}`;
  const css = genCss(key, className, cssBody);
  // this adds the rule to the buffer to be injected into the document
  injector.addRule(className, css);
  return {
    key,
    className,
    rule,
    css,
  };
};

const extractRules = style => {
  const declarations = {};
  // media queries and pseudo styles are the exception, not the rule, so we are going to assume
  // they are null most of the time and only create an object when we need to.
  let mediaQueries = null;
  let pseudoStyles = null;

  Object.keys(style).forEach(key => {
    if (key[0] === ':') {
      pseudoStyles = pseudoStyles || {};
      pseudoStyles[key] = createCssRule(
        key,
        style[key],
        (pseudo, className, body) => `.${className}${key}{${body}}`
      );
    } else if (key[0] === '@') {
      mediaQueries = mediaQueries || {};
      mediaQueries[key] = createCssRule(
        key,
        style[key],
        (query, className, body) => `${query}{.${className}{${body}}}`
      );
    } else {
      declarations[key] = style[key];
    }
  });

  return {
    declarations,
    mediaQueries,
    pseudoStyles,
  };
};

const registerStyle = style => {
  // TODO(lmr):
  // do "proptype"-like validation here in non-production build
  const id = guid();
  const rules = extractRules(style);
  declarationRegistry[id] = rules.declarations;
  mediaQueryRegistry[id] = rules.mediaQueries;
  pseudoStyleRegistry[id] = rules.pseudoStyles;
  return id;
};

const getStyle = id => declarationRegistry[id];

const create = styles => {
  const result = {};
  Object.keys(styles).forEach(key => {
    result[key] = registerStyle(styles[key]);
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
const mergeStyle = (a, b) => {
  let key;
  for (key in b) {
    if (!hasOwnProperty.call(b, key)) {
      continue;
    }
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
  return a;
};

const flattenStyle = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => mergeStyle(acc, flattenStyle(val)), {});
  } else if (typeof input === 'number') {
    return getStyle(input);
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return input;
};

const getClassNames = id => {
  const mediaQueryRules = mediaQueryRegistry[id];
  const pseudoStyleRules = pseudoStyleRegistry[id];
  if (!mediaQueryRules && !pseudoStyleRules) {
    return null;
  }
  const results = [];
  if (mediaQueryRules) {
    results.push.apply(results, mapKeyValue(mediaQueryRules, (id, rule) => rule.className));
  }
  if (pseudoStyleRules) {
    results.push.apply(results, mapKeyValue(pseudoStyleRules, (id, rule) => rule.className));
  }
  return results.join(' ') || null;
};

const flattenClassNames = (input) => {
  if (Array.isArray(input)) {
    return input.map(flattenClassNames).filter(x => !!x).join(' ') || null;
  } else if (typeof input === 'number') {
    return getClassNames(input);
  }
  return null;
};

const resolve = (styles) => ({
  className: flattenClassNames(styles),
  style: flattenStyle(styles), // TODO(lmr): do we need expandStyle and processTransform here?
});


module.exports = {
  hairlineWidth: getHairlineWidth(),
  create,
  // NOTE:
  // `flatten` is exported separately from `resolve` because it mimics the RN api more closely
  // than `resolve`.
  flatten: style => flattenStyle(style) || {},
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
