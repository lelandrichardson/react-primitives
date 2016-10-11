const React = require('react');
const CSSPropertyOperations = require('react/lib/CSSPropertyOperations');
const applyPrimitiveMethods = require('./applyPrimitiveMethods');
const StyleSheet = require('./StyleSheet');
const flexibility = require('flexibility');

const { PropTypes } = React;
const { string, oneOf, bool, oneOfType, func, array, object, number, node } = PropTypes;


const FLEXBOX_SUPPORTED = (() => {
  if (!global.document) {
    return true;
  }
  const test = document.createElement('test');

  test.style.display = 'flex';

  return test.style.display === 'flex';
})();


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
  component: oneOfType([
    func,
    string,
  ]),
  style: oneOfType([
    array,
    object,
    number,
  ]),
  testID: string,
  type: string,
  extraClassName: string,
  children: node,
};

const defaultProps = {
  accessible: true,
  component: 'div',
};

function Primitive(props) {
  if (!(this instanceof Primitive)) {
    return new Primitive(props);
  }
  if (!FLEXBOX_SUPPORTED) {
    this.__setEl = this.__setEl.bind(this);
  }
  return React.Component.call(this, props);
}

Primitive.prototype.render = function render() {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRole,
    accessible,
    component,
    testID,
    type,
    style,
    extraClassName,
    } = this.props;

  const resolvedStyle = StyleSheet.resolve(style, extraClassName);
  const Component = roleComponents[accessibilityRole] || component;

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
      role={accessibilityRole}
      style={resolvedStyle.style}
      type={accessibilityRole === 'button' ? 'button' : type}
    >
      {this.props.children}
    </Component>
  );
};

Primitive.propTypes = propTypes;
Primitive.defaultProps = defaultProps;
applyPrimitiveMethods(Primitive);

module.exports = Primitive;
