const React = require('react');
const StyleSheet = require('../StyleSheet');
const StyleSheetPropType = require('../propTypes/StyleSheetPropType');
const TextStylePropTypes = require('./TextStylePropTypes');
const applyPrimitiveMethods = require('../util/applyPrimitiveMethods');
const { FLEXBOX_SUPPORTED, applyFlexboxPolyfill } = require('../util/flexboxSupport');

const { PropTypes } = React;
const { string, number, oneOf, bool, node, func } = PropTypes;

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
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf([
    'assertive',
    'off',
    'polite',
  ]),
  accessibilityRole: string,
  accessible: bool,
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
  numberOfLines: number,
  style: StyleSheetPropType(TextStylePropTypes),
  testID: string,
  children: node,
};

class Text extends React.Component {
  constructor(props) {
    super(props);
    if (!FLEXBOX_SUPPORTED) {
      this.__setEl = this.__setEl.bind(this);
    }
  }
  render() {
    const {
      accessibilityRole,
      style,
      numberOfLines,
    } = this.props;

    const passedStyle = numberOfLines === 1 ? [style, styles.singleLineStyle] : style;
    const resolvedStyle = StyleSheet.resolve(passedStyle, 'rp_Text');
    const Component = (accessibilityRole && roleComponents[accessibilityRole]) || 'span';

    const props = {
      className: resolvedStyle.className,
      style: resolvedStyle.style,
      children: this.props.children,
    };

    if (this.props.testID) {
      props['data-testid'] = this.props.testID;
    }

    if (
      this.props.onResponderGrant
    ) {
      Object.assign(props, {
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
      });
    }

    if (
      this.props.accessible !== undefined ||
      this.props.accessibilityLabel ||
      this.props.accessibilityRole
    ) {
      Object.assign(props, {
        'aria-hidden': this.props.accessible === false,
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
  }
}

Text.propTypes = propTypes;

applyPrimitiveMethods(Text);
applyFlexboxPolyfill(Text);

const styles = StyleSheet.create({
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

module.exports = Text;
