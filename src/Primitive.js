const React = require('react');
const applyPrimitiveMethods = require('./applyPrimitiveMethods');
const StyleSheet = require('./StyleSheet');

const { PropTypes } = React;
const { string, oneOf, bool, oneOfType, func, array, object, number } = PropTypes;

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
};

const defaultProps = {
  accessible: true,
  component: 'div',
};

class Primitive extends React.Component {
  render() {
    const {
      accessibilityLabel,
      accessibilityLiveRegion,
      accessibilityRole,
      accessible,
      component,
      testID,
      type,
      style,
    } = this.props;

    const Component = roleComponents[accessibilityRole] || component;

    return (
      <Component
        {...StyleSheet.resolve(style)}
        aria-hidden={accessible ? null : true}
        aria-label={accessibilityLabel}
        aria-live={accessibilityLiveRegion}
        data-testid={testID}
        role={accessibilityRole}
        type={accessibilityRole === 'button' ? 'button' : type}
      />
    );
  }
}

Primitive.propTypes = propTypes;
Primitive.defaultProps = defaultProps;
applyPrimitiveMethods(Primitive);

module.exports = Primitive;
