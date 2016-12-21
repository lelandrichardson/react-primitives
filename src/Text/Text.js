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

const defaultProps = {
  accessible: true,
  numberOfLines: null,
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
      accessibilityLabel,
      accessibilityLiveRegion,
      accessibilityRole,
      accessible,
      testID,
      style,
      numberOfLines,
    } = this.props;

    const passedStyle = numberOfLines === 1 ? [style, styles.singleLineStyle] : style;
    const resolvedStyle = StyleSheet.resolve(passedStyle, 'rp_Text');
    const Component = roleComponents[accessibilityRole] || 'span';

    if (!FLEXBOX_SUPPORTED) {
      // this is a performance optimization... and an ugly one at that.
      // we basically want to ensure that `StyleSheet.resolve` doesn't
      // have to get called twice for every update of every primitive,
      // so we cache this value here.
      this.lastResolvedStyle = resolvedStyle.style;
    }

    return (
      <Component
        ref={this.__setEl}
        onStartShouldSetResponder={this.props.onStartShouldSetResponder}
        onResponderTerminationRequest={this.props.onResponderTerminationRequest}
        onResponderGrant={this.props.onResponderGrant}
        onResponderMove={this.props.onResponderMove}
        onResponderRelease={this.props.onResponderRelease}
        onResponderTerminate={this.props.onResponderTerminate}
        aria-hidden={accessible ? null : true}
        aria-label={accessibilityLabel}
        aria-live={accessibilityLiveRegion}
        className={resolvedStyle.className}
        data-testid={testID}
        style={resolvedStyle.style}
      >
        {this.props.children}
      </Component>
    );
  }
}

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

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
