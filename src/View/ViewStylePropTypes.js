const { PropTypes } = require('react');
const BorderPropTypes = require('../propTypes/BorderPropTypes');
const ColorPropType = require('../propTypes/ColorPropType');
const LayoutPropTypes = require('../propTypes/LayoutPropTypes');
const TransformPropTypes = require('../propTypes/TransformPropTypes');
const ShadowPropTypes = require('../propTypes/ShadowPropTypes');

const { number, oneOf, string } = PropTypes;
const autoOrHiddenOrVisible = oneOf(['auto', 'hidden', 'visible', 'scroll']);
const hiddenOrVisible = oneOf(['hidden', 'visible']);

module.exports = {
  ...BorderPropTypes,
  ...LayoutPropTypes,
  ...TransformPropTypes,
  ...ShadowPropTypes,
  // RN-only styles
  elevation: number,

  backfaceVisibility: hiddenOrVisible,
  backgroundColor: ColorPropType,
  opacity: number,
  overflow: autoOrHiddenOrVisible,
  // TODO(lmr): we probably want to shim the RN stylesheet or something to strip
  // these styles, or else it will trigger a redbox in RN.
  /* @platform web */
  WebkitOverflowScrolling: string,
  backgroundAttachment: string,
  backgroundClip: string,
  backgroundImage: string,
  backgroundPosition: string,
  backgroundOrigin: oneOf([
    'border-box',
    'content-box',
    'padding-box',
  ]),
  backgroundRepeat: string,
  backgroundSize: string,
  cursor: string,
  outline: string,
  overflowX: autoOrHiddenOrVisible,
  overflowY: autoOrHiddenOrVisible,
  userSelect: string,
  visibility: hiddenOrVisible,
  zIndex: number,
};
