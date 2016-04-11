import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import Text from '../src/Text/Text';

describe('<Text />', () => {
  it('renders default styles', () => {
    const wrapper = mount(<Text />);
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
