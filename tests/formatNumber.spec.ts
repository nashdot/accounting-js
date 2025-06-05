import { describe, expect, it } from 'vitest';
import { formatNumber, formatNumberArray } from '../dist';

describe('formatNumber()', () => {
  it('should enforce precision and round values', () => {
    expect(formatNumber(123.456789, { precision: 0 })).toEqual('123');
    expect(formatNumber(123.456789, { precision: 1 })).toEqual('123.5');
    expect(formatNumber(123.456789, { precision: 2 })).toEqual('123.46');
    expect(formatNumber(123.456789, { precision: 3 })).toEqual('123.457');
    expect(formatNumber(123.456789, { precision: 4 })).toEqual('123.4568');
    expect(formatNumber(123.456789, { precision: 5 })).toEqual('123.45679');
  });

  it('should fix floting point rounding error', () => {
    expect(formatNumber(0.615, { precision: 2 })).toEqual('0.62');
    expect(formatNumber(0.614, { precision: 2 })).toEqual('0.61');
  });

  it('should work for large numbers', () => {
    expect(formatNumber(123456.54321, { precision: 0 })).toEqual('123,457');
    expect(formatNumber(123456.54321, { precision: 1 })).toEqual('123,456.5');
    expect(formatNumber(123456.54321, { precision: 2 })).toEqual('123,456.54');
    expect(formatNumber(123456.54321, { precision: 3 })).toEqual('123,456.543');
    expect(formatNumber(123456.54321, { precision: 4 })).toEqual('123,456.5432');
    expect(formatNumber(123456.54321, { precision: 5 })).toEqual('123,456.54321');

    expect(formatNumber(98765432.12, { precision: 0 })).toEqual('98,765,432');
    expect(formatNumber(98765432.12, { precision: 1 })).toEqual('98,765,432.1');
    expect(formatNumber(98765432.12, { precision: 2 })).toEqual('98,765,432.12');
    expect(formatNumber(98765432.12, { precision: 3 })).toEqual('98,765,432.120');
    expect(formatNumber(98765432.12, { precision: 4 })).toEqual('98,765,432.1200');
  });

  it('should work for negative number', () => {
    expect(formatNumber(-123456.54321, { precision: 0 })).toEqual('-123,457');
    expect(formatNumber(-123456.54321, { precision: 1 })).toEqual('-123,456.5');
    expect(formatNumber(-123456.54321, { precision: 2 })).toEqual('-123,456.54');
    expect(formatNumber(-123456.54321, { precision: 3 })).toEqual('-123,456.543');
    expect(formatNumber(-123456.54321, { precision: 4 })).toEqual('-123,456.5432');
    expect(formatNumber(-123456.54321, { precision: 5 })).toEqual('-123,456.54321');

    expect(formatNumber(-98765432.12, { precision: 0 })).toEqual('-98,765,432');
    expect(formatNumber(-98765432.12, { precision: 1 })).toEqual('-98,765,432.1');
    expect(formatNumber(-98765432.12, { precision: 2 })).toEqual('-98,765,432.12');
    expect(formatNumber(-98765432.12, { precision: 3 })).toEqual('-98,765,432.120');
    expect(formatNumber(-98765432.12, { precision: 4 })).toEqual('-98,765,432.1200');
  });

  it('should allow setting thousand and decimal separators a flag indicating whether to strip insignificant zeros', () => {
    expect(formatNumber(98765432.120, { precision: 3, stripZeros: true })).toEqual('98,765,432.12');
    expect(formatNumber(98765432.120, { precision: 3, stripZeros: false })).toEqual('98,765,432.120');
    expect(formatNumber(98765432.0120, { precision: 2, stripZeros: true })).toEqual('98,765,432.01');
  // expect(formatNumber(098765432.0120, { precision: 2, stripZeros: true })).toEqual('98,765,432.01');
  });

  it('should allow setting thousands separator', () => {
    expect(formatNumber(98765432.12, { precision: 0, thousand: '|' })).toEqual('98|765|432');
    expect(formatNumber(98765432.12, { precision: 1, thousand: '>' })).toEqual('98>765>432.1');
    expect(formatNumber(98765432.12, { precision: 2, thousand: '*' })).toEqual('98*765*432.12');
    expect(formatNumber(98765432.12, { precision: 3, thousand: '\'' })).toEqual('98\'765\'432.120');
    expect(formatNumber(98765432.12, { precision: 4, thousand: ']' })).toEqual('98]765]432.1200');
  });

  it('should allow setting decimal separator', () => {
    expect(formatNumber(98765432.12, { precision: 0, decimal: '|' })).toEqual('98,765,432');
    expect(formatNumber(98765432.12, { precision: 1, decimal: '>' })).toEqual('98,765,432>1');
    expect(formatNumber(98765432.12, { precision: 2, decimal: '*' })).toEqual('98,765,432*12');
    expect(formatNumber(98765432.12, { precision: 3, decimal: '\'' })).toEqual('98,765,432\'120');
    expect(formatNumber(98765432.12, { precision: 4, decimal: ']' })).toEqual('98,765,432]1200');
  });

  it('should allow setting thousand and decimal separators', () => {
    expect(formatNumber(98765432.12, { precision: 0, thousand: '\\', decimal: '|' })).toEqual('98\\765\\432');
    expect(formatNumber(98765432.12, { precision: 1, thousand: '<', decimal: '>' })).toEqual('98<765<432>1');
    expect(formatNumber(98765432.12, { precision: 2, thousand: '&', decimal: '*' })).toEqual('98&765&432*12');
    expect(formatNumber(98765432.12, { precision: 3, thousand: '"', decimal: '\'' })).toEqual('98"765"432\'120');
    expect(formatNumber(98765432.12, { precision: 4, thousand: '[', decimal: ']' })).toEqual('98[765[432]1200');
  });

  it('should round 74.725 to "74.73"', () => {
    expect(formatNumber(74.725, { precision: 2 })).toEqual('74.73');
  });

  it('should use empty separators if passed as empty string', () => {
    expect(formatNumber(12345.12345, { precision: 2, thousand: '', decimal: '' })).toEqual('1234512');
  });

  it('should handle an array of numbers', () => {
    const vals = formatNumberArray([123, 456.78, 1234.123], { precision: 2 });

    expect(vals[0]).toEqual('123.00');
    expect(vals[1]).toEqual('456.78');
    expect(vals[2]).toEqual('1,234.12');
  });

  it('should accept a properties object', () => {
    const val = formatNumber(123456789.1234, {
      thousand: '.',
      decimal: ',',
      precision: 3,
    });

    expect(val).toEqual('123.456.789,123');
  });

  it('properties should be optional', () => {
    const val = formatNumber(123456789.1234, {});

    expect(val).toEqual('123,456,789.12');
  });
});
