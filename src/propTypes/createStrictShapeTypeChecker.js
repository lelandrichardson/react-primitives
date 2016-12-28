/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const invariant = require('invariant');

module.exports = function createStrictShapeTypeChecker(shapeTypes) {
  function checkType(isRequired, props, propName, componentName, location, ...args) {
    if (!props[propName]) {
      if (isRequired) {
        invariant(
          false,
          `Required object \`${propName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      }
      return;
    }
    const propValue = props[propName];
    const propType = typeof propValue;
    if (propType !== 'object') {
      invariant(
        false,
        `Invalid prop \`${propName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected \`object\`.`
      );
    }
    // We need to check all keys in case some are required but missing from
    // props.
    const allKeys = { ...props[propName], ...shapeTypes };
    for (const key in allKeys) {
      if (!allKeys.hasOwnProperty(key)) continue;
      const checker = shapeTypes[key];
      if (!checker) {
        invariant(
          false,
          `Invalid props.${propName} key \`${key}\` supplied to \`${componentName}\`.` +
          `\nBad object: ` + JSON.stringify(props[propName], null, '  ') +
          `\nValid keys: ` + JSON.stringify(Object.keys(shapeTypes), null, '  ')
        );
      }
      const error = checker(propValue, key, componentName, location, ...args);
      if (error) {
        invariant(
          false,
          error.message + `\nBad object: ` + JSON.stringify(props[propName], null, '  ')
        );
      }
    }
  }

  function chainedCheckType(
    props,
    propName,
    componentName,
    location,
    ...args
  ) {
    return checkType(false, props, propName, componentName, location, ...args);
  }
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
};
