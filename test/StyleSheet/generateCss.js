import { expect } from 'chai';
import { addNewlines, stripWhiteSpace } from '../util';

import generateCss from '../../src/StyleSheet/generateCss';

describe('generateCss()', () => {
  it('works', () => {
    const result = generateCss({
      width: 20,
      borderWidth: 1,
      zIndex: 2,
      flexDirection: 'row',
    });
    expect(addNewlines(result)).to.equal(stripWhiteSpace(`
      border-top-width:1px;
      border-right-width:1px;
      border-bottom-width:1px;
      border-left-width:1px;
      flex-direction:row;
      width:20px;
      z-index:2;
      -webkit-flex-direction:row;
      -ms-flex-direction:row;
      -webkit-box-orient:horizontal;
      -webkit-box-direction:normal;
    `));
  });

  it('expanded style stuff', () => {
    const result = generateCss({
      marginHorizontal: 20,
    });
    expect(addNewlines(result)).to.equal(stripWhiteSpace(`
      margin-right:20px;
      margin-left:20px;
    `));
  });
});
