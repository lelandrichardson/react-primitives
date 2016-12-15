import React from 'react';
import { make } from '../../StoryManger';
import { View, Text } from '../../../src/index-web';

make('Text 1', () => (
  <View style={{ borderWidth: 1, borderColor: '#000' }}>
    <Text
      style={{

      }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut feugiat ipsum arcu,
      id molestie tortor dignissim in. Curabitur ut placerat ipsum. Cras sed arcu nunc.
      Cras sed mauris vitae urna.
    </Text>
  </View>
));

