const React = require('react');
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
const { VrButton } = require('react-360');

const InsetPropType = PropTypes.shape({
  top: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
});

// NOTE(lmr): this is a huge hack right now, and prevents anything from being clickable more than
// twice per second, but the alternative is so bad right now. Need to figure out how to fix the
// responder plugin later and fix this.
const THROTTLE_MS = 500;

function throttle(fn, throttleMs) {
  let lastCall = null;

  return function throttleIt(...args) {
    const now = new Date();
    if (lastCall === null || (now - lastCall > throttleMs)) {
      fn.apply(this, args);
      lastCall = new Date();
    }
  };
}

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, dimming it.
 * This is done without actually changing the view hierarchy, and in general is
 * easy to add to an app without weird side-effects.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <Touchable press={anim} onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('image!myButton')}
 *       />
 *     </Touchable>
 *   );
 * },
 * ```
 */
const Touchable = (
  Animated,
  StyleSheet,
  Platform,
  TouchableMixin,
) => {
  // eslint-disable-next-line react/prefer-es6-class
  return createReactClass({
    displayName: 'Touchable',
    propTypes: {
      accessible: PropTypes.bool,

      // TODO:
      // accessibilityComponentType: PropTypes.oneOf(View.AccessibilityComponentType),
      // accessibilityTraits: PropTypes.oneOfType([
      //   PropTypes.oneOf(View.AccessibilityTraits),
      //   PropTypes.arrayOf(PropTypes.oneOf(View.AccessibilityTraits)),
      // ]),
      /**
       * If true, disable all interactions for this component.
       */
      disabled: PropTypes.bool,
      /**
       * Called when the touch is released, but not if cancelled (e.g. by a scroll
       * that steals the responder lock).
       */
      onPress: PropTypes.func,
      onPressIn: PropTypes.func,
      onPressOut: PropTypes.func,
      /**
       * Invoked on mount and layout changes with
       *
       *   `{nativeEvent: {layout: {x, y, width, height}}}`
       */
      onLayout: PropTypes.func,

      onLongPress: PropTypes.func,

      /**
       * Delay in ms, from the start of the touch, before onPressIn is called.
       */
      delayPressIn: PropTypes.number,
      /**
       * Delay in ms, from the release of the touch, before onPressOut is called.
       */
      delayPressOut: PropTypes.number,
      /**
       * Delay in ms, from onPressIn, before onLongPress is called.
       */
      delayLongPress: PropTypes.number,
      /**
       * When the scroll view is disabled, this defines how far your touch may
       * move off of the button, before deactivating the button. Once deactivated,
       * try moving it back and you'll see that the button is once again
       * reactivated! Move it back and forth several times while the scroll view
       * is disabled. Ensure you pass in a constant to reduce memory allocations.
       */
      pressRetentionOffset: InsetPropType,
      /**
       * This defines how far your touch can start away from the button. This is
       * added to `pressRetentionOffset` when moving off of the button.
       * ** NOTE **
       * The touch area never extends past the parent view bounds and the Z-index
       * of sibling views always takes precedence if a touch hits two overlapping
       * views.
       */
      hitSlop: InsetPropType,
      activeValue: PropTypes.number,
      press: PropTypes.instanceOf(Animated.Value),

      pressDuration: PropTypes.number,
      children: PropTypes.node,
    },

    mixins: [],

    statics: {
      Mixin: TouchableMixin,
    },

    getDefaultProps() {
      return {
        activeValue: 1,
        delayPressIn: 0,
        delayPressOut: 100,
        delayLongPress: 500,
        pressDuration: 150,
        pressRetentionOffset: {
          top: 20,
          left: 20,
          right: 20,
          bottom: 30,
        },
        press: new Animated.Value(0),
      };
    },

    setPressValue(toValue) {
      Animated.timing(
        this.props.press,
        {
          toValue,
          duration: this.props.pressDuration,
          // easing: Easing.inOut(Easing.quad),
        },
      ).start();
    },


    touchableHandleActivePressIn: throttle(function touchableHandleActivePressInNow(e) {
      this._setActive(150);
      // eslint-disable-next-line no-unused-expressions
      this.props.onPressIn && this.props.onPressIn(e);
    }, THROTTLE_MS),

    touchableHandleActivePressOut: throttle(function touchableHandleActivePressOutNow(e) {
      this._setInactive(250);
      // eslint-disable-next-line no-unused-expressions
      this.props.onPressOut && this.props.onPressOut(e);
    }, THROTTLE_MS),

    touchableHandlePress: throttle(function touchableHandlePressNow(e) {
      // eslint-disable-next-line no-unused-expressions
      this.props.onPress && this.props.onPress(e);
    }, THROTTLE_MS),

    touchableHandleLongPress: throttle(function touchableHandleLongPressNow(e) {
      // eslint-disable-next-line no-unused-expressions
      this.props.onLongPress && this.props.onLongPress(e);
    }, THROTTLE_MS),

    _setActive(duration) {
      this.setPressValue(1, duration);
    },

    _setInactive(duration) {
      this.setPressValue(0, duration);
    },

    render() {
      const child = this.props.children;
      return (
        <VrButton
          accessible={this.props.accessible}
          disabled={this.props.disabled}
          onLayout={this.props.onLayout}
          onButtonPress={this.touchableHandleActivePressIn}
          onButtonRelease={this.touchableHandleActivePressOut}
          onClick={this.touchableHandlePress}
          onLongClick={this.touchableHandleLongPress}
        >
          {child}
        </VrButton>
      );
    },
  });
};

module.exports = Touchable;
