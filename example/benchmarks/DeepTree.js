import React from 'react';
import PropTypes from 'prop-types';

const makeDeepTree = ({ View, StyleSheet }) => {
  const propTypes = {
    depth: PropTypes.number.isRequired,
    breadth: PropTypes.number.isRequired,
    wrap: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  };

  class DeepTree extends React.Component {
    render() {
      const { depth, breadth, wrap, id } = this.props;
      let result = (
        <View
          style={[
            styles.outer,
            depth % 2 === 0 ? styles.even : styles.odd,
            styles[`custom${id % 3}`],
          ]}
        >
          {depth === 0 && (
            <View
              style={[
                styles.terminal,
                styles[`terminal${id % 3}`],
              ]}
            />
          )}
          {depth !== 0 && Array.from({ length: breadth }).map((el, i) => (
            <DeepTree
              key={i}
              wrap={wrap}
              depth={depth - 1}
              id={i}
              breadth={breadth}
            />
          ))}
        </View>
      );
      for (var i = 0; i < wrap; i++) {
        result = <View>{result}</View>;
      }
      return result;
    }
  }

  DeepTree.propTypes = propTypes;

  const styles = StyleSheet.create({
    outer: {
      padding: 4,
    },
    odd: {
      flexDirection: 'row',
    },
    even: {
      flexDirection: 'column',
    },
    custom0: {
      backgroundColor: '#222',
    },
    custom1: {
      backgroundColor: '#666',
    },
    custom2: {
      backgroundColor: '#999',
    },
    terminal: {
      width: 20,
      height: 20,
    },
    terminal0: {
      backgroundColor: 'blue',
    },
    terminal1: {
      backgroundColor: 'orange',
    },
    terminal2: {
      backgroundColor: 'red',
    },
  });

  return DeepTree;
};

module.exports = makeDeepTree;
