const addNewlines = str => str.replace(/([;{])/g, '$1\n');
const stripWhiteSpace = str => str.replace(/\n\s*/g, '\n').replace(/^\n/, '');
const stripNewlines = str => str.replace(/\n/, '');
const stripHtml = str => str.replace(/(<([^>]+)>)/ig, '');

module.exports = {
  addNewlines,
  stripWhiteSpace,
  stripHtml,
  stripNewlines,
};
