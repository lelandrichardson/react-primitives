/* global happo */
import React from 'react';
import ReactDOM from 'react-dom';
import { getStories } from '../StoryManager';

// stories
import '../stories/Image';
import '../stories/Text';
import '../stories/View';

getStories().forEach(({ name, Component }) => {
  happo.define(name, (done) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<Component />, div);
    requestAnimationFrame(done);
  });
});

happo.cleanOutElement = (element) => {
  ReactDOM.unmountComponentAtNode(element);
};
