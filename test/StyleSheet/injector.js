import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import StyleSheet from '../../src/StyleSheet';
import View from '../../src/View/View';
import injector from '../../src/StyleSheet/injector';
import { addNewlines, stripWhiteSpace, stripHtml, stripNewlines } from '../util';

const format = str => stripWhiteSpace(addNewlines(stripHtml(str)));

describe('StyleSheet.create()', () => {
  describe('pseudo styles', () => {
    const styles = StyleSheet.create({
      foo: {
        ':hover': {
          borderColor: 'blue',
        },
      },
    });

    const wrapper = mount(<View style={styles.foo} />);

    expect(wrapper.find('div').hasClass('rp_1op7lh9')).to.equal(true);

    expect(format(injector.getStyleSheetHtml())).to.equal(stripWhiteSpace(`
      .rp_1op7lh9:hover{
        border-top-color:blue;
        border-right-color:blue;
        border-bottom-color:blue;
        border-left-color:blue;
      }
    `));
  });
});
