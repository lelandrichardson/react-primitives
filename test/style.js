import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import StyleSheet from '../src/StyleSheet';

describe('style works', () => {
  it('flattens stuff', () => {
    const styles = StyleSheet.create({
      foo: {
        color: 'blue',
        width: 100,
      },
      bar: {
        textDecoration: 'underline',
        width: 20,
      },
    });

    const props = StyleSheet.resolve([styles.foo, styles.bar, {
      height: 200,
    }]);

    expect(props).to.eql({
      className: null,
      style: {
        color: 'blue',
        textDecoration: 'underline',
        width: 20,
        height: 200,
      },
    });
  });

  it('flattens nested stuff', () => {
    const styles = StyleSheet.create({
      foo: {
        color: 'blue',
        width: 100,
      },
      bar: {
        textDecoration: 'underline',
        width: 20,
      },
    });

    const props = StyleSheet.resolve([styles.foo, [styles.bar], [{
      height: 200,
    }]]);

    expect(props).to.eql({
      className: null,
      style: {
        color: 'blue',
        textDecoration: 'underline',
        width: 20,
        height: 200,
      },
    });
  });
});


