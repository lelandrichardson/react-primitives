// Modeled after: http://dieulot.net/css-retina-hairline

// TODO(lmr): come up with an SSR strategy for this...

// NOTE:
// This assumes this script runs after <body>. If it is run inside of `<head>`, it would not work
module.exports = () => {
  let hairlineWidth = 1;
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
