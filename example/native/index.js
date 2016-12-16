/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import './missingBabelHelpers';

import React from 'react';
import AllStories from '../AllStories';
import {
  AppRegistry,
  ScrollView,
} from 'react-native';

export default class native extends React.Component {
  render() {
    return (
      <ScrollView>
        <AllStories />
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('native', () => native);
