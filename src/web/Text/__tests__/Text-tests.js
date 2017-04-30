import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../Text';
import StyleSheet from '../../StyleSheet';

describe('<Text />', () => {
  it('empty with no children', () => {
    expect(renderer.create(
      <Text />
    )).toMatchSnapshot();
  });

  it('empty with children', () => {
    expect(renderer.create(
      <Text>
        Hello World!
      </Text>
    )).toMatchSnapshot();
  });

  it('empty with multiple children', () => {
    expect(renderer.create(
      <Text>
        {'Hello '}
        {' World'}
      </Text>
    )).toMatchSnapshot();
  });


  it('nested Text', () => {
    expect(renderer.create(
      <Text>
        <Text>Hello</Text>
        <Text>World</Text>
      </Text>
    )).toMatchSnapshot();
  });

  it('nested Text different depth', () => {
    expect(renderer.create(
      <Text>
        <Text>Hello</Text>
        World
      </Text>
    )).toMatchSnapshot();
  });

  it('with single registered style', () => {
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
      <Text style={styles.foo}>
        Hello World!
      </Text>
    )).toMatchSnapshot();
  });

  it('with single inline style', () => {
    expect(renderer.create(
      <Text
        style={{
          width: 20,
          height: 20,
        }}
      >
        Hello World!
      </Text>
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
      <Text
        style={[
          styles.foo,
          styles.bar,
          { opacity: 0.5 },
        ]}
      >
        Hello World!
      </Text>
    )).toMatchSnapshot();
  });

  it('with a11y props', () => {
    expect(renderer.create(
      <Text
        style={{
          width: 20,
          height: 20,
        }}
        accessibilityLabel="Label"
        accessible
      >
        Hello World!
      </Text>
    )).toMatchSnapshot();
  });
});
