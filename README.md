# react-primitives

Primitive React Interfaces Across Targets

## Installation

```sh
npm i --save react-primitives
```

### Usage

```jsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-primitives';

class Foo extends React.Component {
  render() {
    return (
      <View style={styles.foo}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foo: {
    width: 100,
    height: 100,
    backgroundColor: '#ff00ff',
  },
});
```


## What is this?

This library attempts to propose an ideal set of primitives around building
React applications, regardless of Platform. In the future, this could be
used as a shared interface among React and React Native components that
don't use platform-specific APIs.

Importantly, this includes `StyleSheet` for declaring styles, as well as
`Animated` for doing declarative Animations.

The exported interface thus far is:

1. `Animated`: Pulled from the [animated](https://github.com/animatedjs/animated) project.
2. `StyleSheet`: Follows React Native's StyleSheet API.
3. `View`: A base component for Layout.
4. `Text`: A base component for Text rendering.
5. `Image`: A base component for Image rendering.
6. `Touchable`: A base component for interaction.

In the future, a `TextInput` component may also be added.


## Props where props are due

This library was largely inspired from the work done by [Nicolas Gallager](https://github.com/necolas) 
and his great work on the [react-native-web](https://github.com/necolas/react-native-web) library. A few of the files
in this repo are even copied directly from his project.
