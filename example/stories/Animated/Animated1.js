import React from 'react';
import { make } from '../../StoryManager';
import { View, Text, Animated, Touchable } from '../../../src/index';

make('Animated 1', () => {
  class Example extends React.Component{
    constructor(props) {
      super(props)

      this.state = {
        anim: new Animated.Value(0),
        on: false
      }

      this.handleClick = this.handleClick.bind(this)
    }

    render() {
      return (
        <Animated.View style={{left: this.state.anim}}>
          <Touchable onPress={this.handleClick}>
            <View style={{ borderWidth: 1, borderColor: '#000' }}>
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  fontSize: 14,
                  lineHeight: 16,
                }}
              >
                Touch Me!
              </Text>
            </View>
          </Touchable>
        </Animated.View>
      )
    }

    handleClick() {
      if (this.state.on) {
        Animated.timing(this.state.anim, {toValue: 400}).start();
        this.setState({
          on: false
        })
      } else {
        Animated.timing(this.state.anim, {toValue: 400}).start();
        this.setState({
          on: true
        })
      }
    }
  }

  return <Example />
});
