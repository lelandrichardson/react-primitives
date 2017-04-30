import StyleSheet from '../';
import init from '../initialStyles';
import { formatCss } from '../test-utils';

const flushedCss = () => formatCss(StyleSheet.getStyleSheetHtml());

describe('Core Styles', () => {

  beforeEach(() => StyleSheet.reset());

  it('Initial Styles match', () => {
    init();
    expect(flushedCss()).toMatchSnapshot();
  });
});
