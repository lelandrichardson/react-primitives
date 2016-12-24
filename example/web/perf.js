import React from 'react';
import ReactDOM from 'react-dom';
import DeepTree from '../benchmarks/DeepTree';
import benchmark from '../benchmarks/benchmark';

const node = document.querySelector('.root');
const setup = () => {/* */};
const teardown = () => ReactDOM.unmountComponentAtNode(node);

const deepTree = ({ wrap, depth, breadth, runs }) => () => benchmark({
  name: `DeepTree (depth=${depth}, breadth=${breadth}, wrap=${wrap})`,
  runs,
  setup,
  teardown,
  task: () => ReactDOM.render(
    <DeepTree
      wrap={wrap}
      depth={depth}
      breadth={breadth}
      id={0}
    />,
    node
  ),
});

Promise.resolve()
  .then(deepTree({ wrap: 0, depth: 3, breadth: 3, runs: 100 }))
  .then(deepTree({ wrap: 4, depth: 3, breadth: 10, runs: 10 }))
  .then(deepTree({ wrap: 1, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTree({ wrap: 2, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTree({ wrap: 3, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTree({ wrap: 4, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTree({ wrap: 5, depth: 3, breadth: 3, runs: 10 }))
  .then(deepTree({ wrap: 6, depth: 3, breadth: 3, runs: 10 }))
  .then(() => ReactDOM.render(
    <DeepTree
      wrap={0}
      depth={4}
      breadth={3}
      id={0}
    />,
    node
  ));
