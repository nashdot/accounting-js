import { describe, expect, it } from 'vitest';
import { settings, unformat } from '../dist';

describe('unformat()', () => {
  it('should remove padding special chars', () => {
    expect(unformat('$ 123,456')).toEqual(123456);
    expect(unformat('$ 123,456.78')).toEqual(123456.78);
    expect(unformat('&*()$ 123,456')).toEqual(123456);
    expect(unformat(';$@#$%^&123,456.78')).toEqual(123456.78);
  });

  it('should work with negative numbers', () => {
    expect(unformat('$ -123,456')).toEqual(-123456);
    expect(unformat('$ -123,456.78')).toEqual(-123456.78);
    expect(unformat('&*()$ -123,456')).toEqual(-123456);
    expect(unformat(';$@#$%^&-123,456.78')).toEqual(-123456.78);
  });

  it('should accept different decimal separators', () => {
    expect(unformat('$ 123,456', ',')).toEqual(123.456);
    expect(unformat('$ 123456|78', '|')).toEqual(123456.78);
    expect(unformat('&*()$ 123>456', '>')).toEqual(123.456);
    expect(unformat(';$@#$%^&123,456\'78', '\'')).toEqual(123456.78);
  });

  it('should handle negative numbers and brackets', () => {
    expect(unformat('(123,456)')).toEqual(-123456);
    expect(unformat('(123)456')).toEqual(-123456);
    expect(unformat('(IND)123')).toEqual(123);
    expect(unformat('IND(123)')).toEqual(-123);
    expect(unformat('-(123)')).toEqual(123);
    expect(unformat('(-123)')).toEqual(123);
    expect(unformat('(1,234.56)')).toEqual(-1234.56);
  });

  it('should handle negative decimal numbers within brackets', () => {
    const decimal = settings.decimal;
    settings.decimal = '@';
    expect(unformat('(1,234@56)')).toEqual(-1234.56);
    expect(unformat('(1,234.56)')).toEqual(-123456);
    settings.decimal = decimal;
  });

  it('should accept an array', () => {
    const vals = unformat(['$ 123', '$567.89', 'R$12,345,678.901']);
    expect(vals[0], 123);
    expect(vals[1], 567.89);
    expect(vals[2], 12345678.901);
  });

  it('should fallback with correct value', () => {
    expect(unformat('string')).toEqual(0);
    expect(unformat({ joss: 1 })).toEqual(0);
    expect(unformat('string', ',', null)).toEqual(null);
    expect(unformat('string', ',', 'failed')).toEqual('failed');
  });
});
