const { PropTypes } = require('react');
const ColorPropType = require('../propTypes/ColorPropType');
const ViewStylePropTypes = require('../View/ViewStylePropTypes');

const { oneOf, string } = PropTypes;
const numberOrString = PropTypes.oneOfType([PropTypes.number, string]);

module.exports = {
  ...ViewStylePropTypes,
  color: ColorPropType,
  fontFamily: string,
  fontSize: numberOrString,
  fontStyle: string,
  fontWeight: string,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: oneOf([
    'center',
    'inherit',
    'justify',
    'justify-all',
    'left',
    'right',
  ]),
  textAlignVertical: oneOf([
    'auto',
    'bottom',
    'center',
    'top',
  ]),
  textDecorationLine: string,
  /* @platform web */
  textOverflow: string,
  /* @platform web */
  textShadow: string,
  /* @platform web */
  textTransform: oneOf([
    'capitalize',
    'lowercase',
    'none',
    'uppercase',
  ]),
  /* @platform web */
  whiteSpace: string,
  /* @platform web */
  wordWrap: string,
  writingDirection: oneOf([
    'auto',
    'ltr',
    'rtl',
  ]),
};
