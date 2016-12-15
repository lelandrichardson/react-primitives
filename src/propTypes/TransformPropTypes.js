/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */

const { PropTypes } = require('react');
const { arrayOf, oneOfType, shape, number, string } = PropTypes;

const ArrayOfNumberPropType = arrayOf(number);
const numberOrString = oneOfType([number, string]);

const TransformMatrixPropType = function (
  props,
  propName,
  componentName,
  ...args
) {
  if (props.transform && props.transformMatrix) {
    return new Error(
      'transformMatrix and transform styles cannot be used on the same ' +
      'component'
    );
  }
  return ArrayOfNumberPropType(props, propName, componentName, ...args);
};

const TransformPropTypes = {
  transform: arrayOf(
    oneOfType([
      shape({ perspective: numberOrString }),
      shape({ rotate: numberOrString }),
      shape({ rotateX: numberOrString }),
      shape({ rotateY: numberOrString }),
      shape({ rotateZ: numberOrString }),
      shape({ scale: numberOrString }),
      shape({ scaleX: numberOrString }),
      shape({ scaleY: numberOrString }),
      shape({ skewX: numberOrString }),
      shape({ skewY: numberOrString }),
      shape({ translateX: numberOrString }),
      shape({ translateY: numberOrString }),
      shape({ translateZ: numberOrString }),
      shape({ translate3d: string }),
    ])
  ),
  transformMatrix: TransformMatrixPropType,
};

module.exports = TransformPropTypes;
