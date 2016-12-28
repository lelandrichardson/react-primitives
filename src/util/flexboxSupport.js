// const flexibility = require('flexibility');
const CSSPropertyOperations = require('react-dom/lib/CSSPropertyOperations');

const FLEXBOX_SUPPORTED = (() => {
  if (!global.document) {
    return true;
  }
  const test = document.createElement('test');

  test.style.display = 'flex';

  return test.style.display === 'flex';
})();

// const node = document.documentElement;

function polyfill() {
  // NOTE(lmr): I'm temporarily disabling this code. Need to re-address later.
  // const node = global.document.documentElement;
  // const node = document.getElementById('root');
  // flexibility(node);
  // const data = flexibility.readAll(node);
  // flexibility.writeAll(data);
  // let queue = [];
  // queue.push(...data);
  // while (queue.length) {
  //   let node = queue.pop();
  //   node.element = null;
  //   queue.push(...node.children);
  // }
  //
  // console.log(JSON.stringify(data, null, ' '));
}


const POLYFILL_THROTTLE = 100;

let lastCall = null;
let timeout = null;

function throttledPolyfill() {
  if (timeout !== null) {
    return;
  }
  const now = new Date;
  if (lastCall === null || now - lastCall > POLYFILL_THROTTLE) {
    timeout = setTimeout(() => {
      polyfill();
      timeout = null;
      lastCall = new Date;
    }, 1000 / 60);
  }
}

// TODO(lmr): throttling probably makes more sense than debouncing
// function debouncePolyfill() {
//   if (timeout) {
//     clearTimeout(timeout);
//   }
//   timeout = setTimeout(polyfill, 1000 / 60);
// }

function componentDidUpdate() {
  if (this.el && this._lastResolvedStyle) {
    const styleMarkup = CSSPropertyOperations.createMarkupForStyles(this._lastResolvedStyle);
    if (this.dataStyleAttribute !== styleMarkup) {
      this.el.setAttribute('data-style', styleMarkup);
      this.dataStyleAttribute = styleMarkup;
      throttledPolyfill();
    }
  }
}

function componentDidMount() {
  if (this.el && this._lastResolvedStyle) {
    const styleMarkup = CSSPropertyOperations.createMarkupForStyles(this._lastResolvedStyle);
    this.el.setAttribute('data-style', styleMarkup);
    this.dataStyleAttribute = styleMarkup;
    throttledPolyfill();
  }
}

function setElementRef(el) {
  this.el = el;
}

// TODO(lmr): add a window resize handler to re-apply polyfill

function applyFlexboxPolyfill(Component) {
  if (!FLEXBOX_SUPPORTED) {
    // eslint-disable-next-line no-param-reassign
    Component.prototype.componentDidUpdate = componentDidUpdate;
    // eslint-disable-next-line no-param-reassign
    Component.prototype.componentDidMount = componentDidMount;
    // eslint-disable-next-line no-param-reassign
    Component.prototype.__setEl = setElementRef;
  }
}


module.exports = {
  FLEXBOX_SUPPORTED,
  applyFlexboxPolyfill,
};
