const React = require('react');
const Primitive = require('../Primitive');
const StyleSheet = require('../StyleSheet');
const StyleSheetPropType = require('../propTypes/StyleSheetPropType');
const ViewStylePropTypes = require('./ViewStylePropTypes');
const normalizeNativeEvent = require('../Touchable/normalizeNativeEvent');
const applyPrimitiveMethods = require('../applyPrimitiveMethods');
const { FLEXBOX_SUPPORTED, applyFlexboxPolyfill } = require('../util/flexboxSupport');

const { PropTypes } = React;
const { func } = PropTypes;

const roleComponents = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  heading: 'h1', // TODO: Figure out the ideal way to support additional semantic header tags.
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section',
};


const propTypes = {
  accessibilityLabel: Primitive.propTypes.accessibilityLabel,
  accessibilityLiveRegion: Primitive.propTypes.accessibilityLiveRegion,
  accessibilityRole: Primitive.propTypes.accessibilityRole,
  accessible: Primitive.propTypes.accessible,
  children: PropTypes.node,
  onClick: func,
  onClickCapture: func,
  onMoveShouldSetResponder: func,
  onMoveShouldSetResponderCapture: func,
  onResponderGrant: func,
  onResponderMove: func,
  onResponderReject: func,
  onResponderRelease: func,
  onResponderTerminate: func,
  onResponderTerminationRequest: func,
  onStartShouldSetResponder: func,
  onStartShouldSetResponderCapture: func,
  onTouchCancel: func,
  onTouchCancelCapture: func,
  onTouchEnd: func,
  onTouchEndCapture: func,
  onTouchMove: func,
  onTouchMoveCapture: func,
  onTouchStart: func,
  onTouchStartCapture: func,
  pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: StyleSheetPropType(ViewStylePropTypes),
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

class View extends React.Component {
  constructor(props) {
    super(props);
    if (!FLEXBOX_SUPPORTED) {
      this.__setEl = this.__setEl.bind(this);
    }
  }
}

View.prototype.render = function render() {
  // TODO(lmr):
  // we should probably ensure that children is not a string, and enforce that those types of
  // children be rendered in a `<Text>` component
  const {
    pointerEvents,
    style,
    accessibilityRole,
  } = this.props;

  const passedStyle = !pointerEvents ? style : [style, { pointerEvents }];

  const resolvedStyle = StyleSheet.resolve(passedStyle, 'rp_View');
  const Component = (accessibilityRole && roleComponents[accessibilityRole]) || 'div';
  const props = {
    className: resolvedStyle.className,
    style: resolvedStyle.style,
    children: this.props.children,
  };

  if (
    this.props.onClick ||
    this.props.onResponderGrant ||
    this.props.onTouchStart
  ) {
    Object.assign(props, {
      onClick: this.props.onClick,
      onClickCapture: this.props.onClickCapture,
      onMoveShouldSetResponder: this.props.onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture: this.props.onMoveShouldSetResponderCapture,
      onResponderGrant: this.props.onResponderGrant,
      onResponderMove: this.props.onResponderMove,
      onResponderReject: this.props.onResponderReject,
      onResponderRelease: this.props.onResponderRelease,
      onResponderTerminate: this.props.onResponderTerminate,
      onResponderTerminationRequest: this.props.onResponderTerminationRequest,
      onStartShouldSetResponder: this.props.onStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.props.onStartShouldSetResponderCapture,
      onTouchCancel: normalizeHandler(this.props.onTouchCancel),
      onTouchCancelCapture: normalizeHandler(this.props.onTouchCancelCapture),
      onTouchEnd: normalizeHandler(this.props.onTouchEnd),
      onTouchEndCapture: normalizeHandler(this.props.onTouchEndCapture),
      onTouchMove: normalizeHandler(this.props.onTouchMove),
      onTouchMoveCapture: normalizeHandler(this.props.onTouchMoveCapture),
      onTouchStart: normalizeHandler(this.props.onTouchStart),
      onTouchStartCapture: normalizeHandler(this.props.onTouchStartCapture),
    });
  }

  if (
    !this.props.accessible ||
    this.props.accessibilityLabel ||
    this.props.accessibilityRole
  ) {
    Object.assign(props, {
      'aria-hidden': this.props.accessible ? null : true,
      'aria-label': this.props.accessibilityLabel,
      'aria-live': this.props.accessibilityLiveRegion,
      role: accessibilityRole,
    });
  }

  if (!FLEXBOX_SUPPORTED) {
    // this is a performance optimization... and an ugly one at that.
    // we basically want to ensure that `StyleSheet.resolve` doesn't
    // have to get called twice for every update of every primitive,
    // so we cache this value here.
    props.ref = this.__setEl;
    this.lastResolvedStyle = resolvedStyle.style;
  }

  return React.createElement(Component, props);
};

View.propTypes = propTypes;
View.defaultProps = defaultProps;
applyPrimitiveMethods(View);
applyFlexboxPolyfill(View);

module.exports = View;
