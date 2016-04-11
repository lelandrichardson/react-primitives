import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Image from '../src/Text/Text';

describe('<Image />', () => {
  it('renders default styles', () => {
    const wrapper = mount(<Image />);
    expect(wrapper.find('span').props().style).to.eql({
      color: 'inherit',
      display: 'inline',
      font: 'inherit',
      margin: 0,
      padding: 0,
      textDecorationLine: 'none',
      wordWrap: 'break-word',
    });
  });
});
