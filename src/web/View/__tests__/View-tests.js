import React from 'react';
import renderer from 'react-test-renderer';
import View from '../View';
import StyleSheet from '../../StyleSheet';

describe('<View />', () => {
  it('empty with no children', () => {
    expect(renderer.create(
      <View />
    )).toMatchSnapshot();
  });

  it('empty with children', () => {
    expect(renderer.create(
      <View>
        <View />
      </View>
    )).toMatchSnapshot();
  });

  it('with single registered style', () => {
    const styles = StyleSheet.create({
      foo: {
        width: 20,
        height: 20,
      },
    });
    expect(renderer.create(
      <View
        style={styles.foo}
      />
    )).toMatchSnapshot();
  });

  it('with single inline style', () => {
    expect(renderer.create(
      <View
        style={{
          width: 20,
          height: 20,
        }}
      >
        Hello World!
      </View>
    )).toMatchSnapshot();
  });

  it('with multiple styles and some inline', () => {
    const styles = StyleSheet.create({
      foo: {
        width: 20,
        height: 20,
      },
      bar: {
        backgroundColor: 'red',
      },
    });
    expect(renderer.create(
      <View
        style={[
          styles.foo,
          styles.bar,
          { opacity: 0.5 },
        ]}
      />
    )).toMatchSnapshot();
  });

  it('with a11y props', () => {
    expect(renderer.create(
      <View
        style={{
          width: 20,
          height: 20,
        }}
        accessibilityLabel="Label"
        accessible
      >
        Hello World!
      </View>
    )).toMatchSnapshot();
  });

  it('with a11y role', () => {
    expect(renderer.create(
      <View
        style={{
          width: 20,
          height: 20,
        }}
        accessibilityRole="button"
      >
        Hello World!
      </View>
    )).toMatchSnapshot();
  });
});
