import transformToWebStyle from '../transformToWebStyle';

describe('transformToWebStyle', () => {
  // TODO: boxShadow
  // TODO: transform
  // TODO: flex

  it('standard props', () => {
    expect(transformToWebStyle({
      width: 20,
      height: 20,
    })).toMatchSnapshot();
  });

  it('expanded props', () => {
    expect(transformToWebStyle({
      padding: 20,
      margin: 20,
    })).toMatchSnapshot();
  });

  it('flex 1', () => {
    expect(transformToWebStyle({
      flex: 1,
    })).toMatchSnapshot();
  });

  it('flex 0', () => {
    expect(transformToWebStyle({
      flex: 0,
    })).toMatchSnapshot();
  });

  it('flexbox properties', () => {
    expect(transformToWebStyle({
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    })).toMatchSnapshot();
  });

  describe('transform', () => {
    it('translateX', () => {
      expect(transformToWebStyle({
        transform: [
          { translateX: 20 },
        ],
      })).toMatchSnapshot();
    });

    it('rotateX', () => {
      expect(transformToWebStyle({
        transform: [
          { rotateX: '30deg' },
        ],
      })).toMatchSnapshot();
    });

    it('multiple', () => {
      expect(transformToWebStyle({
        transform: [
          { translateX: 20 },
          { rotateX: '30deg' },
        ],
      })).toMatchSnapshot();
    });
  });

  describe('expandable props', () => {
    it('paddingHorizontal', () => {
      expect(transformToWebStyle({
        paddingHorizontal: 10,
      })).toMatchSnapshot();
    });
    it('paddingVertical', () => {
      expect(transformToWebStyle({
        paddingVertical: 10,
      })).toMatchSnapshot();
    });
    it('padding', () => {
      expect(transformToWebStyle({
        padding: 10,
      })).toMatchSnapshot();
    });
    it('marginHorizontal', () => {
      expect(transformToWebStyle({
        marginHorizontal: 10,
      })).toMatchSnapshot();
    });
    it('marginVertical', () => {
      expect(transformToWebStyle({
        marginVertical: 10,
      })).toMatchSnapshot();
    });
    it('margin', () => {
      expect(transformToWebStyle({
        margin: 10,
      })).toMatchSnapshot();
    });
    it('borderWidth', () => {
      expect(transformToWebStyle({
        borderWidth: 10,
      })).toMatchSnapshot();
    });
    it('borderStyle', () => {
      expect(transformToWebStyle({
        borderStyle: 'solid',
      })).toMatchSnapshot();
    });
    it('borderColor', () => {
      expect(transformToWebStyle({
        borderColor: '#333',
      })).toMatchSnapshot();
    });
    it('borderRadius', () => {
      expect(transformToWebStyle({
        borderRadius: 10,
      })).toMatchSnapshot();
    });
  });

  describe('colors', () => {
    it('named', () => {
      expect(transformToWebStyle({
        color: 'blue',
      })).toMatchSnapshot();
    });

    it('rgb(...)', () => {
      expect(transformToWebStyle({
        color: 'rgb(10, 10, 10)',
      })).toMatchSnapshot();
    });

    it('rgba(...)', () => {
      expect(transformToWebStyle({
        color: 'rgba(10, 10, 10, 0.5)',
      })).toMatchSnapshot();
    });

    it('short hex', () => {
      expect(transformToWebStyle({
        color: '#fff',
      })).toMatchSnapshot();
    });

    it('normal hex', () => {
      expect(transformToWebStyle({
        color: '#fefefe',
      })).toMatchSnapshot();
    });

    it('long hex', () => {
      expect(transformToWebStyle({
        color: 'fefefefe',
      })).toMatchSnapshot();
    });
  });

  describe('boxShadow', () => {
    it('shadow 1', () => {
      expect(transformToWebStyle({
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          width: 1,
          height: 1,
        },
      })).toMatchSnapshot();
    });

    it('shadow 2', () => {
      expect(transformToWebStyle({
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOffset: {
          width: 1,
          height: 1,
        },
      })).toMatchSnapshot();
    });

    it('shadow 3', () => {
      expect(transformToWebStyle({
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
      })).toMatchSnapshot();
    });
  });

});
