import React from 'react';
import { make } from '../../StoryManger';
import { View, Text } from '../../../src/index';

make('Text 1', () => (
  <View style={{ borderWidth: 1, borderColor: '#000' }}>
    <Text
      style={{
        fontFamily: 'Helvetica',
        fontSize: 14,
        lineHeight: 16,
      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat ipsum arcu,
      id molestie tortor dignissim in. Curabitur ut placerat ipsum. Cras sed arcu nunc.
      Cras sed mauris vitae urna.
    </Text>
  </View>
));

make('Text: numberOfLines=1', () => (
  <View style={{ borderWidth: 1, borderColor: '#000' }}>
    <Text
      style={{
        fontFamily: 'Helvetica',
        fontSize: 14,
        lineHeight: 16,
      }}
      numberOfLines={1}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat ipsum arcu,
      id molestie tortor dignissim in. Curabitur ut placerat ipsum. Cras sed arcu nunc.
      Cras sed mauris vitae urna.
    </Text>
  </View>
));

make('Text: numberOfLines=2', () => (
  <View style={{ borderWidth: 1, borderColor: '#000' }}>
    <Text
      style={{
        fontFamily: 'Helvetica',
        fontSize: 14,
        lineHeight: 16,
      }}
      numberOfLines={2}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat ipsum arcu,
      id molestie tortor dignissim in. Curabitur ut placerat ipsum. Cras sed arcu nunc.
      Cras sed mauris vitae urna.
    </Text>
  </View>
));
