const ReactDOM = require('react-dom');
const UIManager = require('../UIManager');

function setNativeProps(props) {
  UIManager.updateView(ReactDOM.findDOMNode(this), props);
}

function blur() {
  UIManager.blur(ReactDOM.findDOMNode(this));
}

function focus() {
  UIManager.focus(ReactDOM.findDOMNode(this));
}

// TODO(lmr): measure(callback)

module.exports = Constructor => {
  /* eslint no-param-reassign:0 */
  Constructor.prototype.setNativeProps = setNativeProps;
  Constructor.prototype.blur = blur;
  Constructor.prototype.focus = focus;
};
