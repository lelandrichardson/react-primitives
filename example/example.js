import React from 'react';
import ReactDOM from 'react-dom';
import { View, StyleSheet } from '../src/index-web';
import { getStories } from './StoryManger';

// stories
import './stories/Text';
import './stories/View';

const styles = StyleSheet.create({
  app: {
    width: 375,
  },
  story: {
    // flexDirection: 'row',
    margin: 10,
  },
  storyInner: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
  },
  storyText: {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

const App = () => (
  <View style={styles.app}>
    {getStories().map(({ name, Component }) => (
      <View key={name} style={styles.story}>
        <View>
          <Text style={styles.storyText}>{name}</Text>
        </View>
        <View style={styles.storyInner}>
          <Component />
        </View>
      </View>
    ))}
  </View>
);

ReactDOM.render(<App />, document.querySelector('.root'));
