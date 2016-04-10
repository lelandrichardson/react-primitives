const React = require('react');
const StyleSheet = require('./StyleSheet');

const { PropTypes } = React;

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
  accessibilityLabel: PropTypes.string,
  accessibilityLiveRegion: PropTypes.oneOf([
    'assertive',
    'off',
    'polite',
  ]),
  accessibilityRole: PropTypes.string,
  accessible: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  testID: PropTypes.string,
  type: PropTypes.string,
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

module.exports = Primitive;
