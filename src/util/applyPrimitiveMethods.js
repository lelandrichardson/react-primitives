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

function measure(callback) {
  UIManager.measure(ReactDOM.findDOMNode(this), callback);
}

function measureInWindow(callback) {
  UIManager.measureInWindow(ReactDOM.findDOMNode(this), callback);
}

function measureLayout(relativeToNativeNode, onSuccess, onFail) {
  UIManager.measureLayout(ReactDOM.findDOMNode(this), relativeToNativeNode, onFail, onSuccess);
}

module.exports = (Constructor, coreClassName) => {
  /* eslint no-param-reassign:0 */
  Constructor.prototype.coreClassName = coreClassName;
  Constructor.prototype.setNativeProps = setNativeProps;
  Constructor.prototype.blur = blur;
  Constructor.prototype.focus = focus;
  Constructor.prototype.measure = measure;
  Constructor.prototype.measureInWindow = measureInWindow;
  Constructor.prototype.measureLayout = measureLayout;
};
