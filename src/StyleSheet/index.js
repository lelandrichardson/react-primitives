const getHairlineWidth = require('./getHairlineWidth');
const generateCss = require('./generateCss');
const murmurHash = require('./murmurHash');
const injector = require('./injector');
const mapKeyValue = require('../util/mapKeyValue');
const processTransform = require('./processTransform');
const expandStyle = require('./expandStyle');

// TODO:
// 3. ensure that multiple-bundled react-primitives will work...
// 6. use invariant and add a lot of validation + runtime checks
// 7. introduce a "strict mode" which only allows RN-compatible API (not sure about this any more)
// 12. how to handle custom font families??
// 13. refactor this file into sub-files
// 14. move the logic for shadows into `processTransform` instead of `expandStyle`

const hasOwnProperty = Object.prototype.hasOwnProperty;

let _id = 0;
const guid = () => _id++;
const declarationRegistry = {};
const mediaQueryRegistry = {};
const pseudoStyleRegistry = {};
const coreRegistry = {};

function init() {
  const initialRules = {
    // https://github.com/facebook/css-layout#default-values
    rp_View: {
      alignItems: 'stretch',
      borderWidth: 4,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      JsDisplay: 'flex',
      display: 'flex',
      flexBasis: 'auto',
      flexDirection: 'column',
      flexShrink: 0,
      margin: 0,
      padding: 0,
      position: 'relative',
      // button and anchor reset
      backgroundColor: 'transparent',
      color: 'inherit',
      font: 'inherit',
      textAlign: 'inherit',
      textDecorationLine: 'none',
      // list reset
      listStyle: 'none',
      // fix flexbox bugs
      maxWidth: '100%',
      minHeight: 0,
      minWidth: 0,
    },
    rp_ViewReset: {
      flexShrink: 0,
    },
    rp_Text: {
      color: 'inherit',
      display: 'inline',
      font: 'inherit',
      margin: 0,
      padding: 0,
      textDecorationLine: 'none',
      wordWrap: 'break-word',
    },
    rp_Image: {
      borderWidth: 0,
      height: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      opacity: 0,
    },
  };

  Object.keys(initialRules).forEach(key => {
    const cssBody = generateCss(initialRules[key]);
    const css = `.${key}{${cssBody}}`;
    injector.addRule(key, css);
  });
}

// TODO(lmr): we should make this lazy and memoize at some point as a performance optimization
const createCssRule = (prefix, key, rule, genCss) => {
  const cssBody = generateCss(rule);
  // key is the media query, eg. '@media (max-width: 600px)'
  const className = `${prefix}${murmurHash(key + cssBody)}`;
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

const extractRules = (name, style) => {
  const declarations = {};
  // media queries and pseudo styles are the exception, not the rule, so we are going to assume
  // they are null most of the time and only create an object when we need to.
  let mediaQueries = null;
  let pseudoStyles = null;
  let prefix = 'r';

  if (process.env.NODE_ENV === 'development') {
    prefix = `${name}_`;
  }

  Object.keys(style).forEach(key => {
    if (key[0] === ':') {
      pseudoStyles = pseudoStyles || {};
      pseudoStyles[key] = createCssRule(
        prefix,
        key,
        processTransform(expandStyle(style[key])),
        (pseudo, className, body) => `.${className}${key}{${body}}`
      );
    } else if (key[0] === '@') {
      mediaQueries = mediaQueries || {};
      mediaQueries[key] = createCssRule(
        prefix,
        key,
        processTransform(expandStyle(style[key])),
        (query, className, body) => `${query}{.${className}{${body}}}`
      );
    } else {
      declarations[key] = style[key];
    }
  });

  const coreStyles = processTransform(expandStyle(declarations));
  const cssClass = createCssRule(
    prefix,
    '',
    coreStyles,
    (_, className, body) => `.${className}{${body}}`
  );

  return {
    declarations: coreStyles,
    cssClass,
    mediaQueries,
    pseudoStyles,
  };
};

const registerStyle = (name, style) => {
  // TODO(lmr):
  // do "proptype"-like validation here in non-production build
  const id = guid();
  const rules = extractRules(name, style);
  declarationRegistry[id] = rules.declarations;
  mediaQueryRegistry[id] = rules.mediaQueries;
  pseudoStyleRegistry[id] = rules.pseudoStyles;
  coreRegistry[id] = rules.cssClass;
  return id;
};

const getStyle = id => declarationRegistry[id];

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
const mergeStyle = (a, b) => {
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

const flattenStyle = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => mergeStyle(acc, flattenStyle(val)), {});
  } else if (typeof input === 'number') {
    return getStyle(input);
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return expandStyle(input);
};

const flattenNonRegisteredStyles = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => mergeStyle(acc, flattenNonRegisteredStyles(val)), {});
  } else if (typeof input === 'number') {
    return undefined;
  } else if (!input) {
    // input is falsy, so we skip it by returning undefined
    return undefined;
  }
  return expandStyle(input);
};

const getClassNames = id => {
  const coreRule = coreRegistry[id];
  const mediaQueryRules = mediaQueryRegistry[id];
  const pseudoStyleRules = pseudoStyleRegistry[id];
  // the most common case: coreRule exists, media/pseudo do not
  if (!!coreRule && !mediaQueryRules && !pseudoStyleRules) {
    return coreRule.className;
  }
  const results = [];
  if (coreRule) {
    results.push(coreRule);
  }
  if (mediaQueryRules) {
    results.push.apply(results, mapKeyValue(mediaQueryRules, (_, rule) => rule.className));
  }
  if (pseudoStyleRules) {
    results.push.apply(results, mapKeyValue(pseudoStyleRules, (_, rule) => rule.className));
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

const resolve = (styles, extraClassName) => {
  const classes = flattenClassNames(styles);
  const style = flattenNonRegisteredStyles(styles);
  return {
    className: !classes ? extraClassName : `${extraClassName} ${classes}`,
    style: style ? processTransform(style) : null,
  };
};

const returnCopy = (original, result) => original === result ? Object.assign({}, result) : result;

init();

// TODO(lmr):
// I think `flatten` should return a flattened style object, but not transformed into what a browser
// expects.
// As opposed to `resolve`, which should do flattening AND transform into what a browser expects.

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
