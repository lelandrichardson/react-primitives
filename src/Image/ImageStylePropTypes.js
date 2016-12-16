const { PropTypes } = require('react');
const ColorPropType = require('../propTypes/ColorPropType');
const LayoutPropTypes = require('../propTypes/LayoutPropTypes');
const TransformPropTypes = require('../propTypes/TransformPropTypes');
const BorderPropTypes = require('../propTypes/BorderPropTypes');

const ImageResizeMode = require('./ImageResizeMode');

const { number, oneOf, string } = PropTypes;
const hiddenOrVisible = oneOf([
  'hidden',
  'visible',
]);

module.exports = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...TransformPropTypes,
  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  resizeMode: oneOf(Object.keys(ImageResizeMode)),
  /* @platform web */
  boxShadow: string,
  opacity: number,
  overflow: hiddenOrVisible,
  /* @platform web */
  visibility: hiddenOrVisible,
};
