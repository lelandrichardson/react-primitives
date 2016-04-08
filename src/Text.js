import React, { PropTypes } from 'react';
import Primitive from './Primitive';
import StyleSheet from './StyleSheet';

const propTypes = {
  accessibilityLabel: Primitive.propTypes.accessibilityLabel,
  accessibilityRole: Primitive.propTypes.accessibilityRole,
  accessible: Primitive.propTypes.accessible,
  children: PropTypes.any,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  //style: StyleSheetPropType(TextStylePropTypes),
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

export default Text;
