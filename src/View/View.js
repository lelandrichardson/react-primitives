const React = require('react');
const Primitive = require('../Primitive');
const StyleSheet = require('../StyleSheet');
const normalizeNativeEvent = require('../Touchable/normalizeNativeEvent');

const { PropTypes } = React;

const propTypes = {
  accessibilityLabel: Primitive.propTypes.accessibilityLabel,
  accessibilityLiveRegion: Primitive.propTypes.accessibilityLiveRegion,
  accessibilityRole: Primitive.propTypes.accessibilityRole,
  accessible: Primitive.propTypes.accessible,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onClickCapture: PropTypes.func,
  onMoveShouldSetResponder: PropTypes.func,
  onMoveShouldSetResponderCapture: PropTypes.func,
  onResponderGrant: PropTypes.func,
  onResponderMove: PropTypes.func,
  onResponderReject: PropTypes.func,
  onResponderRelease: PropTypes.func,
  onResponderTerminate: PropTypes.func,
  onResponderTerminationRequest: PropTypes.func,
  onStartShouldSetResponder: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  onTouchCancel: PropTypes.func,
  onTouchCancelCapture: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchEndCapture: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchMoveCapture: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchStartCapture: PropTypes.func,
  pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: null, // TODO(lmr): StyleSheetPropType(ViewStylePropTypes),
  testID: Primitive.propTypes.testID,
};

const defaultProps = {
  accessible: true,
  style: null,
};

/**
 * React Native expects `pageX` and `pageY` to be on the `nativeEvent`, but
 * React doesn't include them for touch events.
 */
function normalizeHandler(handler) {
  if (!handler) {
    return undefined;
  }
  return (e) => {
    /* eslint no-param-reassign: 0 */
    if (e.nativeEvent.pageX === undefined) {
      e.nativeEvent = normalizeNativeEvent(e.nativeEvent);
    }
    handler(e);
  };
}

// TODO(lmr): @NativeMethodsDecorator
class View extends React.Component {
  render() {
    // TODO(lmr):
    // we should probably ensure that children is not a string, and enforce that those types of
    // children be rendered in a `<Text>` component
    const {
      pointerEvents,
      style,
    } = this.props;

    const flattenedStyle = StyleSheet.flatten(style);
    const pointerEventsStyle = pointerEvents && { pointerEvents };

    return (
      <Primitive
        {...this.props}
        onClickCapture={normalizeHandler(this.props.onClickCapture)}
        onTouchCancel={normalizeHandler(this.props.onTouchCancel)}
        onTouchCancelCapture={normalizeHandler(this.props.onTouchCancelCapture)}
        onTouchEnd={normalizeHandler(this.props.onTouchEnd)}
        onTouchEndCapture={normalizeHandler(this.props.onTouchEndCapture)}
        onTouchMove={normalizeHandler(this.props.onTouchMove)}
        onTouchMoveCapture={normalizeHandler(this.props.onTouchMoveCapture)}
        onTouchStart={normalizeHandler(this.props.onTouchStart)}
        onTouchStartCapture={normalizeHandler(this.props.onTouchStartCapture)}
        style={[
          styles.initial,
          style,
          // 'View' needs to use 'flexShrink' in its reset when there is no 'flex' style provided
          !flattenedStyle.flex && styles.flexReset,
          pointerEventsStyle,
        ]}
      >
        {this.props.children}
      </Primitive>
    );
  }
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

const styles = StyleSheet.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    // button and anchor reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    // list reset
    listStyle: 'none',
    // fix flexbox bugs
    maxWidth: '100%',
    minHeight: 0,
    minWidth: 0,
  },
  flexReset: {
    flexShrink: 0,
  },
});

module.exports = View;
