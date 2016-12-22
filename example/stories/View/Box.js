import React from 'react';
import { make } from '../../StoryManager';
import { View, Text } from '../../../src/index';

make('Box with 1.2 scale', () => (
  <View style={{ padding: 30 }}>
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
          { scale: 1.2 },
        ],
      }}
    />
  </View>
));

make('Box with 1/2 scale', () => (
  <View style={{ padding: 30 }}>
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
          { scale: 0.5 },
        ],
      }}
    />
  </View>
));

make('Box with translate + rotation', () => (
  <View style={{ padding: 30 }}>
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
          { translateX: 20 },
          { rotate: '45deg' },
        ],
      }}
    />
  </View>
));

make('Box with rotation + translate', () => (
  <View style={{ padding: 30 }}>
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
          { rotate: '45deg' },
          { translateX: 20 },
        ],
      }}
    />
  </View>
));


make('Box with rotation', () => (
  <View style={{ padding: 20 }}>
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        transform: [
          { rotate: '45deg' },
        ],
      }}
    />
  </View>
));

make('Box with top border', () => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'blue',
      borderTopWidth: 10,
      borderColor: '#000',
    }}
  />
));

make('Box with border', () => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'blue',
      borderRadius: 10,
      borderWidth: 10,
      borderColor: '#000',
    }}
  />
));

make('Box with border2', () => (
  <View
    style={{
      width: 100,
      height: 100,
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#000',
    }}
  />
));

make('Three boxes (row)', () => (
  <View
    style={{
      backgroundColor: '#888',
      padding: 10,
      flexDirection: 'row',
    }}
  >
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue'
      }}
    />
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red'
      }}
    />
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'green'
      }}
    />
  </View>
));

make('Three boxes (column)', () => (
  <View
    style={{
      backgroundColor: '#888',
      padding: 10,
      flexDirection: 'column',
    }}
  >
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
      }}
    />
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red',
      }}
    />
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'green',
      }}
    />
  </View>
));


make('Three boxes (row) w/ margins', () => (
  <View
    style={{
      backgroundColor: '#888',
      padding: 10,
      flexDirection: 'row',
    }}
  >
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'blue',
      }}
    />
    <View
      style={{
        width: 100,
        height: 100,
        margin: 10,
        backgroundColor: 'red',
      }}
    />
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'green',
      }}
    />
  </View>
));
