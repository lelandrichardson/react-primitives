function handleOnLayout() {
  if (this.isUnmounted) return;

  const prev = this._prevLayout;

  this.measure((x, y, width, height) => {
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

module.exports = instance => {
  /* eslint-disable no-param-reassign */
  if (instance._hasOnLayoutApplied) return;
  instance._hasOnLayoutApplied = true;
  instance._prevLayout = {};
  instance.isUnmounted = false;

  instance.componentDidMount = safeOverride(
    instance.componentDidMount,
    handleOnLayout
  );

  instance.componentDidUpdate = safeOverride(
    instance.componentDidUpdate,
    handleOnLayout
  );

  instance.componentWillUnmount = safeOverride(
    instance.componentWillUnmount,
    function componentWillUnmount() {
      this.isUnmounted = true;
    }
  );
};
