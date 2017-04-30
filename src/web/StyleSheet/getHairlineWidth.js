// Modeled after: http://dieulot.net/css-retina-hairline

// NOTE:
// This assumes this script runs after <body>. If it is run inside of `<head>`, it will just
// return 1.
module.exports = () => {
  let hairlineWidth = 1;
  if (!global || !global.document || !global.document.body) {
    return hairlineWidth;
  }
  if (global.devicePixelRatio && global.devicePixelRatio >= 2) {
    const testElem = document.createElement('div');
    testElem.style.border = '.5px solid transparent';
    document.body.appendChild(testElem);
    if (testElem.offsetHeight === 1) {
      hairlineWidth = 0.5;
    }
    document.body.removeChild(testElem);
  }
  return hairlineWidth;
};
