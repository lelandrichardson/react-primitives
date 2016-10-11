var ReactPrimitives = require('./lib/index.dom');
var ReactDOM = require('react-dom');
var React = require('react');

var StyleSheet = ReactPrimitives.StyleSheet;
var View = ReactPrimitives.View;
var Text = ReactPrimitives.Text;

ReactDOM.render(
  React.createElement(View, {},
    React.createElement(Text, null,
      "This is text"
    )
  ),
  document.querySelector('.root')
);


