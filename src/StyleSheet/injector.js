const hasOwnProperty = Object.prototype.hasOwnProperty;

let registry = {};
let isDirty = false;
let styleNode = null;

const nextFrame = cb => {
  if (global.requestAnimationFrame) {
    global.requestAnimationFrame(cb);
  } else {
    setTimeout(cb, 16);
  }
};

const interval = cb => {
  const repeat = () => {
    cb();
    nextFrame(repeat);
  };
  nextFrame(repeat);
};


const addRule = (key, rule) => {
  registry[key] = rule;
  isDirty = true;
};

const getStyleText = () => {
  /* eslint prefer-template:0 */
  let result = '\n';
  for (const key in registry) {
    if (hasOwnProperty.call(registry, key)) {
      result += registry[key] + '\n';
    }
  }
  return result;
};


const frame = () => {
  if (!isDirty) return;
  if (!global.document) return;
  const document = global.document;
  isDirty = false;

  // TODO(lmr):
  // in the case of server-side rendering, we might want to include a "checksum" or
  // something to the end of the stylesheet so that we can ensure that we are re-initializing the
  // right one?  I'm not exactly sure how this would work though. The user might have to ensure
  // that there are not more than one "react-primitive" instances running on the page at once.
  if (!styleNode && document.querySelector) {
    styleNode = document.querySelector('style[data-react-primitives-stylesheet]');
  }

  if (!styleNode) {
    // Taken from
    // http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
    const head = document.head || document.getElementsByTagName('head')[0];
    styleNode = document.createElement('style');

    styleNode.type = 'text/css';
    styleNode.setAttribute('data-react-primitives-stylesheet', '');
    head.appendChild(styleNode);
  }

  const css = getStyleText();

  if (styleNode.styleSheet) {
    styleNode.styleSheet.cssText = css;
  } else {
    /* eslint no-cond-assign:0 */
    let last;
    while (last = styleNode.lastChild) {
      styleNode.removeChild(last);
    }
    styleNode.appendChild(document.createTextNode(css));
  }
};

if (global.document) {
  // NOTE(lmr):
  // we are only calling this in a browser environment. On the server we can just use the
  // `getStyleSheetHtml` API.
  interval(frame);
}

const getStyleSheetHtml = () => `<style data-react-primitives-stylesheet>${getStyleText()}</style>`;

module.exports = {
  addRule,
  getStyleSheetHtml,
  reset: () => { registry = {}; },
};
