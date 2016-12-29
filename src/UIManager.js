const asap = require('asap');
const CSSPropertyOperations = require('react-dom/lib/CSSPropertyOperations');

const hasOwnProperty = Object.prototype.hasOwnProperty;

const _measureLayout = (node, relativeToNativeNode, callback) => {
  asap(() => {
    const relativeNode = relativeToNativeNode || node.parentNode;
    const relativeRect = relativeNode.getBoundingClientRect();
    const { height, left, top, width } = node.getBoundingClientRect();
    const x = left - relativeRect.left;
    const y = top - relativeRect.top;
    callback(x, y, width, height, left, top);
  });
};

const UIManager = {
  blur(node) {
    try { node.blur(); } catch (err) {/* ignore */}
  },

  focus(node) {
    try { node.focus(); } catch (err) {/* ignore */}
  },

  measure(node, callback) {
    _measureLayout(node, null, callback);
  },

  measureInWindow(node, callback) {
    asap(() => {
      const { height, left, top, width } = node.getBoundingClientRect();
      callback(left, top, width, height);
    });
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    const relativeTo = relativeToNativeNode || node.parentNode;
    _measureLayout(node, relativeTo, onSuccess);
  },

  updateView(node, props, instance) {
    for (const prop in props) {
      if (!hasOwnProperty.call(props, prop)) {
        continue;
      }
      const value = props[prop];
      switch (prop) {
        case 'style':
          // convert styles to DOM-styles
          CSSPropertyOperations.setValueForStyles(node, value, instance);
          break;
        case 'class':
        case 'className':
          // prevent class names managed by React from being replaced
          node.setAttribute('class', value);
          break;
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          /* eslint no-param-reassign:0 */
          node.value = value;
          break;
        default:
          node.setAttribute(prop, value);
          break;
      }
    }
  },
};

module.exports = UIManager;
