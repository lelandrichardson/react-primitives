import getHairlineWidth from './getHairlineWidth';

// TODO:
// 1. browser-prefixed styles (inline-style-prefixer)
// 2. inject stylesheets and track
// 3. ensure that multiple-bundled react-primitives will work...
// 4. conversion of style hash to css...
// 5. (done) hairline width: http://dieulot.net/css-retina-hairline
// 6. use invariant and add a lot of validation
// 7. introduce a "strict mode" which only allows RN-compatible API
// 8. build a react-native implementation...
// 9. figure out interop with css-layout default values...

let _id = 0;
const guid = () => _id++;
const declarationRegistry = {};
const mediaQueryRegistry = {};
const pseudoStyleRegistry = {};

const extractRules = style => {
  const declarations = {};
  let mediaQueries = null;
  let pseudoStyles = null;

  Object.keys(style).forEach(key => {
    if (key[0] === ':') {
      pseudoStyles = mediaQueries || {};
      pseudoStyles[key] = {
        key,
        // TODO(lmr): these classnames may need to be hashes of the rule content,
        // not incrementing ids.
        className: `rp_${guid()}`,
        rule: style[key],
      };
    } else if (key[0] === '@') {
      mediaQueries = mediaQueries || {};
      mediaQueries[key] = {
        key,
        className: `rp_${guid()}`,
        rule: style[key],
      };
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


const flattenStyle = (input) => {
  if (Array.isArray(input)) {
    return input.reduce((acc, val) => Object.assign(acc, flattenStyle(val)), {});
  } else if (typeof input === 'number') {
    return getStyle(input);
  }
  return input;
};


const getClassNames = id => {
  const mediaQueryRules = mediaQueryRegistry[id];
  const pseudoStyleRules = pseudoStyleRegistry[id];
  if (!mediaQueryRules && !pseudoStyleRules) {
    return null;
  }
  return [
    ...(mediaQueryRules || []).map(x => x.className),
    ...(pseudoStyleRules || []).map(x => x.className),
  ].join(' ') || null;
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
  style: flattenStyle(styles),
});


module.exports = {
  hairlineWidth: getHairlineWidth(),
  create,
  // NOTE: `flatten` is exported separately from `resolve` because it is
  flatten: flattenStyle,
  resolve,
};
