const ReactDOM = require('react-dom');
const UIManager = require('../UIManager');
const StyleSheet = require('../StyleSheet');

module.exports = (Constructor, coreClassName) => {
  /* eslint no-param-reassign:0 */
  Constructor.prototype.coreClassName = coreClassName;
  Constructor.prototype.setNativeProps = function setNativeProps(props) {
    let propsToSend = props;
    if ('style' in props) {
      const resolvedStyle = StyleSheet.resolve(props.style, this.coreClassName);
      propsToSend = { ...propsToSend, ...resolvedStyle };
    }
    UIManager.updateView(ReactDOM.findDOMNode(this), propsToSend, this._reactInternalInstance);
  };
  Constructor.prototype.blur = function blur() {
    UIManager.blur(ReactDOM.findDOMNode(this));
  };
  Constructor.prototype.focus = function focus() {
    UIManager.focus(ReactDOM.findDOMNode(this));
  };
  Constructor.prototype.measure = function measure(callback) {
    UIManager.measure(ReactDOM.findDOMNode(this), callback);
  };
  Constructor.prototype.measureInWindow = function measureInWindow(callback) {
    UIManager.measureInWindow(ReactDOM.findDOMNode(this), callback);
  };
  Constructor.prototype.measureLayout = function measureLayout(
    relativeToNativeNode,
    onSuccess,
    onFail
  ) {
    UIManager.measureLayout(ReactDOM.findDOMNode(this), relativeToNativeNode, onFail, onSuccess);
  };
};
