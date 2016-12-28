import StyleSheet from '../';
import { formatCss } from '../test-utils';

const flushedCss = () => formatCss(StyleSheet.getStyleSheetHtml());
const registerStyle = obj => StyleSheet.create({ foo: obj }).foo;

describe('StyleSheet', () => {

  beforeEach(() => StyleSheet.reset());

  describe('(Rendered CSS)', () => {
    describe('pseudo styles', () => {
      it('allows for pseudo-styles', () => {
        StyleSheet.resolve(registerStyle({
          width: 30,
          ':hover': {
            width: 20,
          },
        }));

        expect(flushedCss()).toMatchSnapshot();
      });
    });
  });

  describe('.resolve(style)', () => {

    describe('classNames and styles', () => {
      it('uses classNames for registered styles', () => {
        const styles = StyleSheet.resolve([
          registerStyle({ width: 20 }),
          registerStyle({ height: 20 }),
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName r67985t r1nerynz1 ',
          style: null,
        });
      });

      it('uses classNames for registered styles and inline styles for objects', () => {
        const styles = StyleSheet.resolve([
          registerStyle({ width: 20 }),
          { height: 20 },
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName r67985t ',
          style: {
            height: '20px',
          },
        });
      });

      it('deopts to inline styles when needed', () => {
        const styles = StyleSheet.resolve([
          { height: 20 },
          registerStyle({ width: 20 }),
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName',
          style: {
            width: '20px',
            height: '20px',
          },
        });
      });

      it('identical styles result in a single class', () => {
        const a = StyleSheet.resolve(registerStyle({ height: 20 }), 'coreClassName');
        const b = StyleSheet.resolve(registerStyle({ height: 20 }), 'coreClassName');

        expect(a).toMatchObject(b);
      });
    });

    describe('transform styles', () => {
      // merging
      // multiple transforms
      // ordering
      // units

      it('merges transforms together', () => {
        const styles = StyleSheet.resolve([
          {
            transform: [
              { translateX: 20 },
            ],
          },
          {
            transform: [
              { rotateX: '20deg' },
            ],
          },
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName',
          style: {
            WebkitTransform: 'translateX(20px) rotateX(20deg)',
            msTransform: 'translateX(20px) rotateX(20deg)',
            transform: 'translateX(20px) rotateX(20deg)',
          },
        });
      });

      it('honors the correct order (1)', () => {
        const styles = StyleSheet.resolve([
          {
            transform: [
              { translateX: 20 },
              { rotateX: '20deg' },
            ],
          },
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName',
          style: {
            WebkitTransform: 'translateX(20px) rotateX(20deg)',
            msTransform: 'translateX(20px) rotateX(20deg)',
            transform: 'translateX(20px) rotateX(20deg)',
          },
        });
      });

      it('honors the correct order (2)', () => {
        const styles = StyleSheet.resolve([
          {
            transform: [
              { rotateX: '20deg' },
              { translateX: 20 },
            ],
          },
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName',
          style: {
            WebkitTransform: 'rotateX(20deg) translateX(20px)',
            msTransform: 'rotateX(20deg) translateX(20px)',
            transform: 'rotateX(20deg) translateX(20px)',
          },
        });
      });
    });

    describe('expanded / shorthand props', () => {

      it('expands individual props', () => {
        const styles = StyleSheet.resolve([
          { padding: 20 },
          { paddingTop: 0 },
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName',
          style: {
            paddingBottom: '20px',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '0px',
          },
        });
      });

      it('expands shorthands props', () => {
        const styles = StyleSheet.resolve([
          { padding: 20 },
          { paddingHorizontal: 0 },
        ], 'coreClassName');

        expect(styles).toMatchObject({
          className: 'coreClassName',
          style: {
            paddingBottom: '20px',
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '20px',
          },
        });
      });
    });

    describe('positional classes', () => {

      it('classNames are applied based on the style array position', () => {
        const a = registerStyle({ width: 1 }); // rnuu8u2
        const b = registerStyle({ width: 2 }); // r1d4rkvr
        const c = registerStyle({ width: 3 }); // r1rjx91z
        const d = registerStyle({ width: 4 }); // r1e1iju1

        const test = (s, v) => expect(StyleSheet.resolve(s, 'core').className).toMatch(v);

        test([a, b, c, d], 'core rnuu8u2 r1d4rkvr1 r1rjx91z2 r1e1iju13 ');
        test([a, [b, c], d], 'core rnuu8u2 r1d4rkvr1 r1rjx91z2 r1e1iju13 ');
        test([a, [b, [c]], d], 'core rnuu8u2 r1d4rkvr1 r1rjx91z2 r1e1iju13 ');
        test([a, [], [b, [c]], d], 'core rnuu8u2 r1d4rkvr1 r1rjx91z2 r1e1iju13 ');
        test([a, [b], [[c]], d], 'core rnuu8u2 r1d4rkvr1 r1rjx91z2 r1e1iju13 ');
        test([a, c, b, d], 'core rnuu8u2 r1rjx91z1 r1d4rkvr2 r1e1iju13 ');
        test([false, false, false, d], 'core r1e1iju13 ');
        test([false, false, d, false], 'core r1e1iju12 ');
        test([d, false, false, false], 'core r1e1iju1 ');
      });

      it('does not flush styles before they are used', () => {
        registerStyle({ width: 1 });
        expect(flushedCss()).toMatchSnapshot();
      });

      it('flushes styles when they are used', () => {
        const style = registerStyle({ width: 1 });
        StyleSheet.resolve(style, 'coreClassName');
        expect(flushedCss()).toMatchSnapshot();
      });

      it('uses compound selectors when styles are applied at a certain index', () => {
        const style = registerStyle({ width: 1 });
        StyleSheet.resolve([false, style], 'coreClassName');
        expect(flushedCss()).toMatchSnapshot();
      });

    });

    // TODO: styles aren't flushed until they're used
    // TODO: expanded / shorthand props
    // TODO: overrides
    // TODO: prefixed properties
    // TODO: two registered styles, same hash
    // TODO: default styles
    // TODO: nested arrays of styles
    // TODO: positional classes w/ nested arrays
    // TODO: boxShadow

  });
});
