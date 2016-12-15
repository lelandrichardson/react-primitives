let stories = [];

const make = (name, Component) => {
  stories.push({ name, Component });
};
const getStories = () => stories;
const clear = () => { stories = []; };

module.exports = {
  make,
  getStories,
  clear,
};
