import React from 'react';
import ReactDOM from 'react-dom';
import { Animated, View, Touchable } from 'react-primitives';


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
        <Touchable press={press} onPress={() => console.log('press!')}>
          <Animated.View
            style={{
              backgroundColor: 'blue',
              width: 100,
              height: 100,
              opacity: press.interpolate({
                inputRange: [ 0, 1 ],
                outputRange: [ 1, 0 ],
              }),
            }}
          >

          </Animated.View>
        </Touchable>
      </View>
    );
  }
}

const Wrap = ({ children }) => (
  <div

  >
    {children}
  </div>
);

// ReactDOM.render(, document.querySelector('.other'));

ReactDOM.render(<Wrap><App /></Wrap>, document.querySelector('.root'));
