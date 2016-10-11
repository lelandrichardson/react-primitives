const React = require('react');
const Primitive = require('../Primitive');
const StyleSheet = require('../StyleSheet');
const StyleSheetPropType = require('../propTypes/StyleSheetPropType');
const TextStylePropTypes = require('./TextStylePropTypes');
const applyPrimitiveMethods = require('../applyPrimitiveMethods');

const { PropTypes } = React;

const propTypes = {
  accessibilityLabel: Primitive.propTypes.accessibilityLabel,
  accessibilityRole: Primitive.propTypes.accessibilityRole,
  accessible: Primitive.propTypes.accessible,
  children: PropTypes.any,
  numberOfLines: PropTypes.number,
  style: StyleSheetPropType(TextStylePropTypes),
  testID: Primitive.propTypes.testID,
};

const defaultProps = {
  accessible: true,
  numberOfLines: null,
};

class Text extends React.Component {
  render() {
    const {
      style,
      numberOfLines,
    } = this.props;
    const passedStyle = numberOfLines === 1 ? [style, styles.singleLineStyle] : style;
    return (
      <Primitive
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityRole={this.props.accessibilityRole}
        accessible={this.props.accessible}
        onStartShouldSetResponder={this.props.onStartShouldSetResponder}
        onResponderTerminationRequest={this.props.onResponderTerminationRequest}
        onResponderGrant={this.props.onResponderGrant}
        onResponderMove={this.props.onResponderMove}
        onResponderRelease={this.props.onResponderRelease}
        onResponderTerminate={this.props.onResponderTerminate}
        component="span"
        extraClassName="rp_Text"
        style={passedStyle}
        testID={this.props.testID}
      >
        {this.props.children}
      </Primitive>
    );
  }
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;
applyPrimitiveMethods(Text);

const styles = StyleSheet.create({
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

module.exports = Text;
