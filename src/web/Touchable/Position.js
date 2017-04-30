/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */

// TODO(lmr): since there's no way we are getting rid of `react/lib/*` dependencies, we might as
// well use the react version of this instead.
const PooledClass = require('./PooledClass');

/**
 * Position does not expose methods for construction via an `HTMLDOMElement`,
 * because it isn't meaningful to construct such a thing without first defining
 * a frame of reference.
 *
 * @param {number} windowStartKey Key that window starts at.
 * @param {number} windowEndKey Key that window ends at.
 */
function Position(left, top) {
  this.left = left;
  this.top = top;
}

Position.prototype.destructor = function() {
  this.left = null;
  this.top = null;
};

PooledClass.addPoolingTo(Position, PooledClass.twoArgumentPooler);

module.exports = Position;
