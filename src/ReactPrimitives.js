// TODO(lmr):
// Use getter functions on primitives to warn if injection didn't happen for an API

// TODO(lmr):
// Use getter functions + warn / throw if a non-primitive API is retrieved off of ReactPrimitives
// that looks like a react-native API

const ReactPrimitives = {
  StyleSheet: null,
  View: null,
  Text: null,
  Image: null,
  Touchable: null,
  Easing: null,
  Animated: null,
  Dimensions: null,
  PixelRatio: require('./modules/PixelRatio'),
  Platform: require('./modules/Platform'),
  inject: (api) => {
    if (api.StyleSheet) {
      ReactPrimitives.StyleSheet = api.StyleSheet;
    }
    if (api.View) {
      ReactPrimitives.View = api.View;
    }
    if (api.Text) {
      ReactPrimitives.Text = api.Text;
    }
    if (api.Image) {
      ReactPrimitives.Image = api.Image;
    }
    if (api.Touchable) {
      ReactPrimitives.Touchable = api.Touchable;
    }
    if (api.Easing) {
      ReactPrimitives.Easing = api.Easing;
    }
    if (api.Animated) {
      ReactPrimitives.Animated = api.Animated;
    }
    if (api.Dimensions) {
      ReactPrimitives.Dimensions = api.Dimensions;
    }
    if (api.Platform) {
      ReactPrimitives.Platform.inject(api.Platform);
    }
  },
};

module.exports = ReactPrimitives;
