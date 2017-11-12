import React from 'react';
import { make } from '../../StoryManager';
import { View, Text, Touchable } from '../../../src/index';

make('Touchable', class TouchableStory extends React.Component {
  state = {
    events: [],
  };

  handleLongPress = () => this.addEvent('onLongPress');
  handlePress = () => this.addEvent('onPress');
  handlePressIn = () => this.addEvent('onPressIn');
  handlePressOut = () => this.addEvent('onPressOut');

  addEvent(eventName) {
    this.setState(({ events }) => ({
      events: [...events, eventName],
    }));
  }

  render() {
    return (
      <View>
        <View>
          <Touchable
            onLongPress={this.handleLongPress}
            onPress={ this.handlePress }
            onPressIn={this.handlePressIn}
            onPressOut={this.handlePressOut}
          >
            <View style={{ padding: 10, backgroundColor: '#ececec' }}>
              <Text style={{ textAlign: 'center' }}>Press Me</Text>
            </View>
          </Touchable>
        </View>
        <View style={{ padding: 10 }}>
          {this.state.events.map((e, i) => (
            <View key={i}>
              <Text>{e}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
});

