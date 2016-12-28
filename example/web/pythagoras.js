import React from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, Animated, View, Touchable } from 'react-primitives';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      press: new Animated.Value(0),
    };
  }
  render() {
    const { press } = this.state;
    return (
      <View>
        <View
          style={[
            styles.test,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    borderBottomColor: "#F00",
    // borderTopWidth: 0,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    borderBottomWidth: 10,
    borderWidth: 0,
    transform: [
      { translateX: 200 },
    ]
  },
  green: {
    backgroundColor: 'green',
  },
});

ReactDOM.render(<App />, document.querySelector('.root'));
