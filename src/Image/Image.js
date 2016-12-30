const React = require('react');
const StyleSheet = require('../StyleSheet');
const View = require('../View/View');
const resolveAssetSource = require('./resolveAssetSource');
const ImageResizeMode = require('./ImageResizeMode');
const ImageStylePropTypes = require('./ImageStylePropTypes');
const StyleSheetPropType = require('../propTypes/StyleSheetPropType');
const applyPrimitiveMethods = require('../util/applyPrimitiveMethods');

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

const { PropTypes } = React;
const { string, node, bool, func, oneOf } = PropTypes;

const ImageSourcePropType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
  PropTypes.string,
]);

const propTypes = {
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf([
    'assertive',
    'off',
    'polite',
  ]),
  accessibilityRole: string,
  accessible: bool,
  children: node,
  defaultSource: ImageSourcePropType,
  onLayout: func,
  onError: func,
  onLoad: func,
  onLoadEnd: func,
  onLoadStart: func,
  resizeMode: oneOf([
    'contain',
    'cover',
    'none',
    'stretch',
  ]),
  source: ImageSourcePropType,
  style: StyleSheetPropType(ImageStylePropTypes),
  testID: string,
};

// Style props that need to pass through to both
const BOTH = {
  flex: true,
  position: true,
};

// Style props to be passed in to the "inner" node
const INNER = {
  padding: true,
  paddingBottom: true,
  paddingHorizontal: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,
  paddingVertical: true,

  flexDirection: true,
  flexBasis: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,

  justifyContent: true,
  alignItems: true,

  backgroundColor: true,
};

function extractStyles(style, passedResizeMode) {
  if (!style) {
    return { inner: null, outer: null };
  }
  const styles = StyleSheet.flatten(style);
  const inner = {};
  const outer = {};
  const resizeMode = passedResizeMode || styles.resizeMode || ImageResizeMode.cover;

  Object.keys(styles).forEach(key => {
    if (key === 'resizeMode') {
      // do nothing
    } else if (INNER[key]) {
      inner[key] = styles[key];
    } else if (BOTH[key]) {
      inner[key] = styles[key];
      outer[key] = styles[key];
    } else {
      outer[key] = styles[key];
    }
    if (key === 'position' && styles[key] === 'absolute') {
      // position absolute is tricky. we basically want the outer node to have the correct full
      // position, and then the inner node needs to essentially be "absoluteFill".
      inner.top = 0;
      inner.left = 0;
      inner.bottom = 0;
      inner.right = 0;
    }
  });

  return { inner, outer, resizeMode };
}

const imageCache = {};

const promiseForImage = uri => {
  if (imageCache[uri]) return imageCache[uri];
  if (!global.Image) {
    throw new Error(`Attempting to prefetch image ${uri} in a server-rendered route`);
  }
  const promise = new Promise((resolve, reject) => {
    const image = new global.Image();
    image.onerror = reject;
    image.onload = () => {
      resolve({
        width: image.naturalWidth || image.width,
        height: image.naturalHeight || image.height,
      });
    };
    image.src = uri;
  });
  imageCache[uri] = promise;
  return promise;
};


class Image extends React.Component {

  static prefetch(url) {
    return promiseForImage(url).then(() => true);
  }

  static getSize(url, success, failure) {
    promiseForImage(url).then(({ width, height }) => success(width, height), failure);
  }

  constructor(props, context) {
    super(props, context);
    const uri = resolveAssetSource(props.source);
    // state
    this.state = { status: uri ? STATUS_PENDING : STATUS_IDLE };
    // autobinding
    this._onError = this._onError.bind(this);
    this._onLoad = this._onLoad.bind(this);
  }

  componentDidMount() {
    if (this.state.status === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextUri = resolveAssetSource(nextProps.source);
    if (resolveAssetSource(this.props.source) !== nextUri) {
      this.setState({
        status: nextUri ? STATUS_PENDING : STATUS_IDLE,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === STATUS_PENDING && !this._image) {
      this._createImageLoader();
    }
  }

  componentWillUnmount() {
    this._destroyImageLoader();
  }

  _createImageLoader() {
    const uri = resolveAssetSource(this.props.source);

    this._destroyImageLoader();
    this._image = new global.Image();
    this._image.onerror = this._onError;
    this._image.onload = this._onLoad;
    this._image.src = uri;
    this._onLoadStart();
  }

  _destroyImageLoader() {
    if (this._image) {
      this._image.onerror = null;
      this._image.onload = null;
      this._image = null;
    }
  }

  _onError(e) {
    const { onError } = this.props;
    const event = { nativeEvent: e };

    this._destroyImageLoader();
    this.setState({ status: STATUS_ERRORED });
    this._onLoadEnd();
    if (onError) onError(event);
  }

  _onLoad(e) {
    const { onLoad } = this.props;
    const event = { nativeEvent: e };

    this._destroyImageLoader();
    this.setState({ status: STATUS_LOADED });
    if (onLoad) onLoad(event);
    this._onLoadEnd();
  }

  _onLoadEnd() {
    const { onLoadEnd } = this.props;
    if (onLoadEnd) onLoadEnd();
  }

  _onLoadStart() {
    const { onLoadStart } = this.props;
    this.setState({ status: STATUS_LOADING });
    if (onLoadStart) onLoadStart();
  }

  render() {
    const {
      accessibilityLabel,
      accessible,
      children,
      defaultSource,
      source,
      testID,
      onLayout,
    } = this.props;

    const isLoaded = this.state.status === STATUS_LOADED;
    const displayImage = resolveAssetSource(!isLoaded ? defaultSource : source);
    const backgroundImage = displayImage ? `url("${displayImage}")` : null;

    const {
      outer,
      inner,
      resizeMode,
    } = extractStyles(this.props.style, this.props.resizeMode);

    /**
     * Image is a non-stretching View. The image is displayed as a background
     * image to support `resizeMode`. The HTML image is hidden but used to
     * provide the correct responsive image dimensions, and to support the
     * image context menu. Child content is rendered into an element absolutely
     * positioned over the image.
     */
    return (
      <View
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="img"
        accessible={accessible}
        onLayout={onLayout}
        style={[
          styles.container,
          outer,
          backgroundImage && { backgroundImage },
          resizeModeStyles[resizeMode],
        ]}
        testID={testID}
      >
        <img
          src={displayImage}
          className="rp_Image"
        />
        {children && (
          <View
            pointerEvents="box-none"
            style={[StyleSheet.absoluteFill, inner]}
          >
            {children}
          </View>
        )}
      </View>
    );
  }
}

Image.propTypes = propTypes;
Image.resizeMode = ImageResizeMode;
Image.displayName = 'Image';

applyPrimitiveMethods(Image);

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
});

const resizeModeStyles = StyleSheet.create({
  contain: {
    backgroundSize: 'contain',
  },
  cover: {
    backgroundSize: 'cover',
  },
  none: {
    backgroundSize: 'auto',
  },
  stretch: {
    backgroundSize: '100% 100%',
  },
});

module.exports = Image;
