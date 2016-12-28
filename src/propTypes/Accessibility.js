const { PropTypes } = require('react');

const Components = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  heading: 'h1', // TODO: Figure out the ideal way to support additional semantic header tags.
  img: 'div',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section',
};

const RolePropType = PropTypes.oneOf(Object.keys(Components));
const LiveRegionPropType = PropTypes.oneOf([
  'assertive',
  'off',
  'polite',
]);

module.exports = {
  RolePropType,
  LiveRegionPropType,
  Components,
};
