import React, { PropTypes } from 'react';
import Primitive from '../Primitive';
import StyleSheet from '../StyleSheet';
import normalizeNativeEvent from '../Touchable/normalizeNativeEvent';

const defaultProps = {
  accessible: true,
  style: null,
};

const propTypes = {
  accessibilityLabel: Primitive.propTypes.accessibilityLabel,
  accessibilityLiveRegion: Primitive.propTypes.accessibilityLiveRegion,
  accessibilityRole: Primitive.propTypes.accessibilityRole,
  accessible: Primitive.propTypes.accessible,
  children: PropTypes.any,
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

// TODO(lmr): @NativeMethodsDecorator
class View extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._normalizeEventForHandler = this._normalizeEventForHandler.bind(this);
  }

  /**
   * React Native expects `pageX` and `pageY` to be on the `nativeEvent`, but
   * React doesn't include them for touch events.
   */
  _normalizeEventForHandler(handler) {
    if (!handler) {
      return undefined;
    }
    return (e) => {
      /* eslint no-param-reassign: 0 */
      const { pageX } = e.nativeEvent;
      if (pageX === undefined) {
        e.nativeEvent = normalizeNativeEvent(e.nativeEvent);
      }
      handler(e);
    };
  }

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
        onClickCapture={this._normalizeEventForHandler(this.props.onClickCapture)}
        onTouchCancel={this._normalizeEventForHandler(this.props.onTouchCancel)}
        onTouchCancelCapture={this._normalizeEventForHandler(this.props.onTouchCancelCapture)}
        onTouchEnd={this._normalizeEventForHandler(this.props.onTouchEnd)}
        onTouchEndCapture={this._normalizeEventForHandler(this.props.onTouchEndCapture)}
        onTouchMove={this._normalizeEventForHandler(this.props.onTouchMove)}
        onTouchMoveCapture={this._normalizeEventForHandler(this.props.onTouchMoveCapture)}
        onTouchStart={this._normalizeEventForHandler(this.props.onTouchStart)}
        onTouchStartCapture={this._normalizeEventForHandler(this.props.onTouchStartCapture)}
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
