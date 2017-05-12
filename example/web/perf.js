import React from 'react';
import ReactDOM from 'react-dom';
import makeDeepTree from '../benchmarks/DeepTree';
import benchmark from '../benchmarks/benchmark';

const node = document.querySelector('.root');
const setup = () => {/* */};
const teardown = () => ReactDOM.unmountComponentAtNode(node);

const ReactPrimitives = require('react-primitives');
const ReactNativeWeb = require('react-native-web');

const DeepTreeRP = makeDeepTree(ReactPrimitives);
const DeepTreeRNW = makeDeepTree(ReactNativeWeb);

const deepTreeRPW = ({ wrap, depth, breadth, runs }) => () => benchmark({
  name: `DeepTree (React Primitives) (depth=${depth}, breadth=${breadth}, wrap=${wrap})`,
  runs,
  setup,
  teardown,
  task: () => ReactDOM.render(
    <DeepTreeRP
      wrap={wrap}
      depth={depth}
      breadth={breadth}
      id={0}
    />,
    node
  ),
});

const deepTreeRNW = ({ wrap, depth, breadth, runs }) => () => benchmark({
  name: `DeepTree (React Native Web) (depth=${depth}, breadth=${breadth}, wrap=${wrap})`,
  runs,
  setup,
  teardown,
  task: () => ReactDOM.render(
    <DeepTreeRNW
      wrap={wrap}
      depth={depth}
      breadth={breadth}
      id={0}
    />,
    node
  ),
});

Promise.resolve()
  .then(deepTreeRPW({ wrap: 0, depth: 3, breadth: 3, runs: 100 }))
  .then(deepTreeRNW({ wrap: 0, depth: 3, breadth: 3, runs: 100 }))

  .then(deepTreeRPW({ wrap: 4, depth: 3, breadth: 10, runs: 10 }))
  .then(deepTreeRNW({ wrap: 4, depth: 3, breadth: 10, runs: 10 }))

  .then(deepTreeRPW({ wrap: 1, depth: 5, breadth: 3, runs: 10 }))
  .then(deepTreeRNW({ wrap: 1, depth: 5, breadth: 3, runs: 10 }))

  .then(deepTreeRPW({ wrap: 2, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTreeRNW({ wrap: 2, depth: 3, breadth: 3, runs: 10 }))

  .then(deepTreeRPW({ wrap: 3, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTreeRNW({ wrap: 3, depth: 3, breadth: 3, runs: 10 }))

  .then(deepTreeRPW({ wrap: 4, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTreeRNW({ wrap: 4, depth: 3, breadth: 3, runs: 10 }))

  .then(deepTreeRPW({ wrap: 5, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTreeRNW({ wrap: 5, depth: 3, breadth: 3, runs: 10 }))

  .then(deepTreeRPW({ wrap: 6, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTreeRNW({ wrap: 6, depth: 3, breadth: 3, runs: 10 }))

  .then(() => ReactDOM.render(
    <DeepTreeRNW
      wrap={0}
      depth={4}
      breadth={3}
      id={0}
    />,
    node
  ));
