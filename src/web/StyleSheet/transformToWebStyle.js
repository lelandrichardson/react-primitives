const prefixAll = require('inline-style-prefixer/static'); // 2.4kb gzipped
const prefixedProperties = require('./prefixedProperties');
const normalizeValue = require('./normalizeValue');
const colorWithOpacity = require('../util/colorWithOpacity');
const hasOwnProperty = Object.prototype.hasOwnProperty;

const styleShortHands = {
  borderColor: {
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
  },
  borderRadius: {
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    borderBottomLeftRadius: true,
  },
  borderStyle: {
    borderTopStyle: true,
    borderRightStyle: true,
    borderBottomStyle: true,
    borderLeftStyle: true,
  },
  borderWidth: {
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true,
  },
  margin: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
  },
  marginHorizontal: {
    marginRight: true,
    marginLeft: true,
  },
  marginVertical: {
    marginTop: true,
    marginBottom: true,
  },
  overflow: {
    overflowX: true,
    overflowY: true,
  },
  padding: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
  },
  paddingHorizontal: {
    paddingRight: true,
    paddingLeft: true,
  },
  paddingVertical: {
    paddingTop: true,
    paddingBottom: true,
  },
  textDecorationLine: {
    textDecoration: true,
  },
  writingDirection: {
    direction: true,
  },
};

/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
const sortProps = (propsArray) => propsArray.sort((a, b) => {
  const expandedA = styleShortHands[a];
  const expandedB = styleShortHands[b];
  if (expandedA && expandedA[b]) {
    return -1;
  } else if (expandedB && expandedB[a]) {
    return 1;
  }
  // eslint-disable-next-line no-nested-ternary
  return (a < b) ? -1 : (a > b) ? 1 : 0;
});

const resolveFlexStyle = (resolvedStyle, flex /* , style */) => {
  // TODO(lmr): RN now supports some of these properties. look into how to handle
  // eslint-disable-next-line no-param-reassign
  resolvedStyle.flexGrow = flex;
  // eslint-disable-next-line no-param-reassign
  resolvedStyle.flexShrink = 1;
  // eslint-disable-next-line no-param-reassign
  resolvedStyle.flexBasis = 'auto';
};

const resolveShadowProperty = (resolvedStyle, style) => {
  const opacity = style.shadowOpacity != null ? style.shadowOpacity : 1;
  const color = colorWithOpacity(style.shadowColor, opacity);
  const offset = style.shadowOffset || { width: 0, height: 0 };
  const x = normalizeValue('width', offset.width || 0);
  const y = normalizeValue('height', offset.height || 0);
  const r = style.shadowRadius || 0;

  // we multiply by 2 here because on native, the radius is in terms of
  // "points" which are multiple pixels, but on the web they are in terms of
  // pixels. A more same strategy might be to divide this by PizelRatio.get()
  // in the react native case.
  const rpx = normalizeValue('shadowRadius', r * 3);

  // eslint-disable-next-line no-param-reassign
  resolvedStyle.boxShadow = `${color} ${x} ${y} ${rpx}`;
};

// { scale: 2 } => 'scale(2)'
const mapTransform = (transform) => {
  const key = Object.keys(transform)[0];
  return `${key}(${normalizeValue(key, transform[key])})`;
};

// mutative
const resolveTransformProperty = (resolvedStyle, transform) => {
  // eslint-disable-next-line no-param-reassign
  resolvedStyle.transform = transform.map(mapTransform).join(' ');
};

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
const transformToWebStyle = (style) => {
  if (!style) return style;

  const propsArray = Object.keys(style);
  const sortedProps = sortProps(propsArray);
  let resolvedStyle = {};
  let hasResolvedShadow = false;
  let needsPrefix = false;

  for (let i = 0; i < sortedProps.length; i++) {
    const key = sortedProps[i];
    const value = style[key];
    if (!needsPrefix && prefixedProperties[key]) {
      needsPrefix = true;
    }
    switch (key) {
      case 'flex':
        resolveFlexStyle(resolvedStyle, value, style);
        break;
      case 'textAlignVertical':
        resolvedStyle.verticalAlign = (value === 'center' ? 'middle' : value);
        break;
      case 'transform':
        resolveTransformProperty(resolvedStyle, value);
        break;
      case 'shadowColor':
      case 'shadowOffset':
      case 'shadowOpacity':
      case 'shadowRadius':
        if (!hasResolvedShadow) {
          resolveShadowProperty(resolvedStyle, style);
          hasResolvedShadow = true;
        }
        break;
      case 'borderColor':
      case 'borderRadius':
      case 'borderStyle':
      case 'borderWidth':
      case 'margin':
      case 'marginHorizontal':
      case 'marginVertical':
      case 'overflow':
      case 'padding':
      case 'paddingHorizontal':
      case 'paddingVertical':
      case 'textDecorationLine':
      case 'writingDirection': {
        const expandedProps = styleShortHands[key];
        const normalizedVal = normalizeValue(key, value);
        for (const propName in expandedProps) {
          if (hasOwnProperty.call(expandedProps, propName)) {
            resolvedStyle[propName] = normalizedVal;
          }
        }
      } break;
      case 'elevation':
        // ignore
        break;
      default:
        resolvedStyle[key] = normalizeValue(key, value);
        break;
    }
  }
  // micro-optimization. For simple styles that don't have properties that need to be prefixed,
  // we avoid making this call all together.
  if (needsPrefix) {
    resolvedStyle = prefixAll(resolvedStyle);
  }
  return resolvedStyle;
};

module.exports = transformToWebStyle;
