const hasOwnProperty = Object.prototype.hasOwnProperty;

const Platform = {
  OS: 'unknown',
  Version: 0,
  select: obj => {
    if (hasOwnProperty.call(obj, Platform.OS)) {
      return obj[Platform.OS];
    }
    return obj.default;
  },
  inject: platform => {
    Platform.OS = platform.OS;
    Platform.Version = platform.Version;
  },
};

module.exports = Platform;
