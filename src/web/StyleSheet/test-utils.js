const addNewlines = str => str.replace(/([;{,])/g, '$1\n');
const addNewline = str => str.replace(/([{])/g, '\n$1');
const stripWhiteSpace = str => str.replace(/\n\s*/g, '\n').replace(/^\n/, '');
const stripNewlines = str => str.replace(/\n/, '');
const stripHtml = str => str.replace(/(<([^>]+)>)/ig, '');
const formatCss = str => addNewline(addNewlines(stripHtml(str)));

module.exports = {
  formatCss,
  addNewlines,
  stripWhiteSpace,
  stripHtml,
  stripNewlines,
};
