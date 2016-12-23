const { PropTypes } = require('react');
const ColorPropType = require('./ColorPropType');


const ShadowPropTypes = {
  shadowColor: ColorPropType,
  shadowOffset: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
};

module.exports = ShadowPropTypes;
