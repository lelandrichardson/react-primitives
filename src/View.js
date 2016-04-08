import React from 'react';
import Primitive from './Primitive';

class View extends React.Component {
  render() {
    return (
      <Primitive
        {...this.props}
      >
        {this.props.children}
      </Primitive>
    );
  }
}

export default View;
