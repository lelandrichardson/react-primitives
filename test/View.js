import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import View from '../src/View/View';

describe('<View />', () => {
  it('renders default styles', () => {
    const wrapper = mount(<View />);
    expect(wrapper.find('div').props().style).to.eql({
      alignItems: 'stretch',
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 0,
      boxSizing: 'border-box',
      color: 'inherit',
      display: 'flex',
      flexBasis: 'auto',
      flexDirection: 'column',
      flexShrink: 0,
      font: 'inherit',
      listStyle: 'none',
      margin: 0,
      maxWidth: '100%',
      minHeight: 0,
      minWidth: 0,
      padding: 0,
      position: 'relative',
      textAlign: 'inherit',
      textDecorationLine: 'none',
    });
  });
});
