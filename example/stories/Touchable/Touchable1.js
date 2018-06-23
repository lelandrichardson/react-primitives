import React from 'react';
import { make } from '../../StoryManager';
import { View, Text, Touchable } from '../../../src/index';

make('Touchable 1', () => (
  <Touchable onPress={() => console.log('pressed')}>
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
));
