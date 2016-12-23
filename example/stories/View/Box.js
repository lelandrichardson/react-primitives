import React from 'react';
import { make } from '../../StoryManager';
import { View, Text } from '../../../src/index';

make('overflow', () => (
  <View style={{ padding: 30, flexDirection: 'row' }}>
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#000',
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: 'blue',
          marginTop: -10,
        }}
      />
    </View>
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        overflow: 'visible',
        borderWidth: 1,
        borderColor: '#000',
      }}
    >
      <View
        style={{
          width: 30,
          height: 30,
          backgroundColor: 'blue',
          marginTop: -10,
        }}
      />
    </View>
  </View>
));


// shadow

make('shadow', () => (
  <View style={{ padding: 30, flexDirection: 'row' }}>
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 40,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
      }}
    />
  </View>
));


// border types

make('border types (1px)', () => (
  <View style={{ padding: 30, flexDirection: 'row' }}>
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 1,
        borderStyle: 'solid',
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 1,
        borderStyle: 'dotted',
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 1,
        borderStyle: 'dashed',
      }}
    />
  </View>
));

make('border types (4px)', () => (
  <View style={{ padding: 30, flexDirection: 'row' }}>
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 4,
        borderStyle: 'solid',
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 4,
        borderStyle: 'dotted',
      }}
    />
    <View
      style={{
        width: 50,
        height: 50,
        margin: 10,
        borderWidth: 4,
        borderStyle: 'dashed',
      }}
    />
  </View>
));

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
