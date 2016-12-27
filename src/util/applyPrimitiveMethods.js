const ReactDOM = require('react-dom');
const UIManager = require('../UIManager');
const StyleSheet = require('../StyleSheet');

function setNativeProps(props) {
  let propsToSend = props;
  if ('style' in props) {
    const resolvedStyle = StyleSheet.resolve(props.style, this.coreClassName);
    propsToSend = { ...propsToSend, ...resolvedStyle };
  }
  UIManager.updateView(ReactDOM.findDOMNode(this), propsToSend, this._reactInternalInstance);
}

function blur() {
  UIManager.blur(ReactDOM.findDOMNode(this));
}

function focus() {
  UIManager.focus(ReactDOM.findDOMNode(this));
}

// TODO(lmr): measure(callback)

module.exports = (Constructor, coreClassName) => {
  /* eslint no-param-reassign:0 */
  Constructor.prototype.coreClassName = coreClassName;
  Constructor.prototype.setNativeProps = setNativeProps;
  Constructor.prototype.blur = blur;
  Constructor.prototype.focus = focus;
};
