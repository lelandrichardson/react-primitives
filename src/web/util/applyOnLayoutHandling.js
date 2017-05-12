const throttleAndDebounce = require('./throttleAndDebounce');

let _id = 1;
// it's important that guid returns something that isn't an integer-looking string
// so JS VM treats registry like a map
const guid = () => `r${_id++}`;

const THROTTLE_MS = 150;
const DEBOUNCE_MS = 16;

const registry = {};

function triggerAll() {
  Object.keys(registry).forEach(key => {
    const instance = registry[key];
    instance.handleOnLayout();
  });
}

function safeOverride(original, next) {
  if (original) {
    return function prototypeOverride() {
      original.call(this);
      next.call(this);
    };
  }
  return next;
}

if (global.document && global.addEventListener) {
  global.addEventListener(
    'resize',
    throttleAndDebounce(triggerAll, THROTTLE_MS, DEBOUNCE_MS),
    false
  );
}

module.exports = Component => {
  /* eslint-disable no-param-reassign */
  Component.prototype.handleOnLayout = function handleOnLayout() {
    const prev = this._prevLayout;

    this.measure((x, y, width, height) => {
      if (this._isUnmounted) return;
      if (
        prev.width !== width ||
        prev.height !== height ||
        prev.x !== x ||
        prev.y !== y
      ) {
        // eslint-disable-next-line no-param-reassign
        this._prevLayout = { x, y, width, height };

        if (this.props.onLayout) {
          this.props.onLayout({
            nativeEvent: {
              layout: this._prevLayout,
            },
          });
        }
      }
    });
  };

  Component.prototype.applyOnLayoutIfNeeded = function applyOnLayoutIfNeeded() {
    /* eslint-disable no-param-reassign */
    // on server side, do nothing.
    if (!global.document) return;
    // we only need to apply this to the instance once.
    if (this._hasOnLayoutApplied) return;

    this._hasOnLayoutApplied = true;
    this._prevLayout = {};
    this._onLayoutId = guid();
    this._isUnmounted = false;
    // add instance to registry so that it gets called on window resizes
    registry[this._onLayoutId] = this;

    this.componentDidMount = safeOverride(
      this.componentDidMount,
      function componentDidMount() {
        this.handleOnLayout();
      }
    );

    this.componentDidUpdate = safeOverride(
      this.componentDidUpdate,
      function componentDidUpdate() {
        this.handleOnLayout();
      }
    );

    this.componentWillUnmount = safeOverride(
      this.componentWillUnmount,
      function componentWillUnmount() {
        this._isUnmounted = true;
        delete registry[this._onLayoutId];
      }
    );
  };
};
