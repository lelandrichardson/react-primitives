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
    handleOnLayout(instance);
  });
}

function handleOnLayout(instance) {
  const prev = instance._prevLayout;

  instance.measure((x, y, width, height) => {
    if (instance._isUnmounted) return;
    if (
      prev.width !== width ||
      prev.height !== height ||
      prev.x !== x ||
      prev.y !== y
    ) {
      // eslint-disable-next-line no-param-reassign
      instance._prevLayout = { x, y, width, height };

      if (instance.props.onLayout) {
        instance.props.onLayout({
          nativeEvent: {
            layout: instance._prevLayout,
          },
        });
      }
    }
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

module.exports = instance => {
  /* eslint-disable no-param-reassign */
  // on server side, do nothing.
  if (!global.document) return;
  // we only need to apply this to the instance once.
  if (instance._hasOnLayoutApplied) return;

  instance._hasOnLayoutApplied = true;
  instance._prevLayout = {};
  instance._onLayoutId = guid();
  instance._isUnmounted = false;
  // add instance to registry so that it gets called on window resizes
  registry[instance._onLayoutId] = instance;

  instance.componentDidMount = safeOverride(
    instance.componentDidMount,
    function componentDidMount() {
      handleOnLayout(this);
    }
  );

  instance.componentDidUpdate = safeOverride(
    instance.componentDidUpdate,
    function componentDidUpdate() {
      handleOnLayout(this);
    }
  );

  instance.componentWillUnmount = safeOverride(
    instance.componentWillUnmount,
    function componentWillUnmount() {
      this._isUnmounted = true;
      delete registry[this._onLayoutId];
    }
  );
};
