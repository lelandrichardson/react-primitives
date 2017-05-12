/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */

const createStrictShapeTypeChecker = require('./createStrictShapeTypeChecker');
const { flatten } = require('../StyleSheet');

module.exports = function StyleSheetPropType(shape) {
  const shapePropType = createStrictShapeTypeChecker(shape);
  return (props, propName, componentName, location, ...args) => {
    let newProps = props;
    if (props[propName]) {
      // Just make a dummy prop object with only the flattened style
      newProps = {};
      newProps[propName] = flatten(props[propName]);
    }
    return shapePropType(newProps, propName, componentName, location, ...args);
  };
};
