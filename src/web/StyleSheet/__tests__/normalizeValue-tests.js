import normalizeValue from '../normalizeValue';

describe('normalizeValue', () => {
  it('adds units for numbers w/ units', () => {
    expect(normalizeValue('width', 20)).toEqual('20px');
  });

  it('keeps units for values w/ units', () => {
    expect(normalizeValue('width', '20px')).toEqual('20px');
  });

  it('unitless numbers stay unitless', () => {
    expect(normalizeValue('opacity', 0.5)).toEqual(0.5);
  });
});
