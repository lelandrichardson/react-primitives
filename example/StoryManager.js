let stories = [];

const make = (name, Component) => {
  Component.displayName = `Story(${name})`;
  stories.push({ name, Component });
};
const getStories = () => stories;
const clear = () => { stories = []; };

module.exports = {
  make,
  getStories,
  clear,
};
