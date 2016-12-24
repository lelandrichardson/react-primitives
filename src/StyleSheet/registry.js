const generateCss = require('./generateCss');
const murmurHash = require('./murmurHash');
const mapKeyValue = require('../util/mapKeyValue');
const injector = require('./injector');

let _id = 1;
const guid = () => _id++;
const declarationRegistry = {};
const mediaQueryRegistry = {};
const pseudoStyleRegistry = {};
const coreRegistry = {};

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
        style[key],
        (pseudo, className, body) => `.${className}${key}{${body}}`
      );
    } else if (key[0] === '@') {
      mediaQueries = mediaQueries || {};
      mediaQueries[key] = createCssRule(
        prefix,
        key,
        style[key],
        (query, className, body) => `${query}{.${className}{${body}}}`
      );
    } else {
      declarations[key] = style[key];
    }
  });

  const cssClass = createCssRule(
    prefix,
    '',
    declarations,
    (_, className, body) => `.${className}{${body}}`
  );

  return {
    declarations,
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


module.exports = {
  registerStyle,
  getStyle,
  getClassNames,
};
