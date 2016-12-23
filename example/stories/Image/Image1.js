import React from 'react';
import { make } from '../../StoryManager';
import { View, Text, Image, StyleSheet } from '../../../src/index';

const image = (w, h = w) => ({ uri: `../assets/image_1_${w}_${h}.jpeg` });

const styles = StyleSheet.create({
  a: {
    color: 'blue',
    width: 20,
  },
  b: {
    width: 20,
    color: 'blue',
  },
  foo: {
    margin: 10,
    padding: 10,
    backgroundColor: 'orange',
  },
  bar: {
    margin: 10,
    padding: 10,
    backgroundColor: 'blue',
  },
});

make('css example', () => (
  <View>
    <View
      style={[styles.bar, { width: 100, height: 100 }]}
    >
      <View
        style={styles.foo}
      />
    </View>
  </View>
));

make('Image: border radius', () => (
  <Image
    style={{
      width: 200,
      height: 200,
      borderRadius: 100,
    }}
    source={image(200)}
  />
));

make('Image: with children 2', () => (
  <Image
    style={{
      width: 200,
      height: 200,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    source={image(200)}
  >
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'white',
      }}
    />
  </Image>
));


make('Image: with children 1', () => (
  <Image
    style={{
      width: 200,
      height: 200,
      padding: 10,
    }}
    source={image(200)}
  >
    <View
      style={{
        width: 20,
        height: 20,
        backgroundColor: 'white',
      }}
    />
  </Image>
));

make('Image: resizeMode=stretch 1', () => (
  <Image
    style={{
      borderWidth: 1,
      borderColor: '#000',
      width: 200,
      height: 200,
      resizeMode: 'stretch',
    }}
    source={image(300, 200)}
  />
));

make('Image: resizeMode=contain 1', () => (
  <Image
    style={{
      borderWidth: 1,
      borderColor: '#000',
      width: 200,
      height: 200,
      resizeMode: 'contain',
    }}
    source={image(300, 200)}
  />
));

make('Image: resizeMode=contain 2', () => (
  <Image
    style={{
      borderWidth: 1,
      borderColor: '#000',
      width: 200,
      height: 200,
      resizeMode: 'contain',
    }}
    source={image(200, 300)}
  />
));

make('Image 3', () => (
  <Image
    style={{
      borderWidth: 1,
      borderColor: '#000',
      width: 200,
      height: 200,
    }}
    source={image(200, 300)}
  />
));


make('Image 1', () => (
  <Image
    style={{
      borderWidth: 1,
      borderColor: '#000',
      width: 200,
      height: 200,
    }}
    source={image(200)}
  />
));

make('Image 2', () => (
  <Image
    style={{
      borderWidth: 1,
      borderColor: '#000',
      width: 50,
      height: 50,
    }}
    source={image(50)}
  />
));
