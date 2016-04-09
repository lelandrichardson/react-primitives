// { scale: 2 } => 'scale(2)'
const mapTransform = (transform) => {
  const key = Object.keys(transform)[0];
  return `${key}(${transform[key]})`;
};

const processTransform = (style) => {
  /* eslint no-param-reassign:0 */
  if (style && style.transform) {
    style.transform = style.transform.map(mapTransform).join(' ');
  }
  return style;
};

module.exports = processTransform;
