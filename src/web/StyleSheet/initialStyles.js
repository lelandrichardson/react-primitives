const generateCss = require('./generateCss');
const injector = require('./injector');

function init() {
  const initialRules = {
    // https://github.com/facebook/css-layout#default-values
    rp_View: {
      alignItems: 'stretch',
      borderWidth: 0,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      JsDisplay: 'flex',
      display: 'flex',
      flexBasis: 'auto',
      flexDirection: 'column',
      flexShrink: 0,
      margin: 0,
      padding: 0,
      position: 'relative',
      // button and anchor reset
      backgroundColor: 'transparent',
      color: 'inherit',
      font: 'inherit',
      textAlign: 'inherit',
      textDecorationLine: 'none',
      // list reset
      listStyle: 'none',
      // fix flexbox bugs
      minHeight: 0,
      minWidth: 0,
    },
    rp_ViewReset: {
      flexShrink: 0,
    },
    rp_Text: {
      color: 'inherit',
      display: 'inline',
      font: 'inherit',
      margin: 0,
      padding: 0,
      textDecorationLine: 'none',
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
    },
    rp_Image: {
      borderWidth: 0,
      height: 'auto',
      maxHeight: '100%',
      maxWidth: '100%',
      opacity: 0,
    },
  };

  Object.keys(initialRules).forEach(key => {
    const cssBody = generateCss(initialRules[key]);
    const css = `.${key}{${cssBody}}`;
    injector.addRule(key, css);
  });
}

module.exports = init;
