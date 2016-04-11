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
  onPress: PropTypes.func,
  style: StyleSheetPropType(TextStylePropTypes),
  testID: Primitive.propTypes.testID,
};

const defaultProps = {
  accessible: true,
};

class Text extends React.Component {
  render() {
    const {
      style,
      numberOfLines,
    } = this.props;
    return (
      <Primitive
        {...this.props}
        component="span"
        onClick={this.props.onPress}
        style={[
          styles.initial,
          style,
          numberOfLines === 1 && styles.singleLineStyle,
        ]}
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
  initial: {
    color: 'inherit',
    display: 'inline',
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    wordWrap: 'break-word',
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

module.exports = Text;
