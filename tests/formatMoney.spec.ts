import { describe, expect, it } from 'vitest';
import { formatMoney } from '../dist';

describe('formatMoney()', () => {
  it('should work for small numbers', () => {
    expect(formatMoney(123)).toEqual('$123.00');
    expect(formatMoney(123.45)).toEqual('$123.45');
    expect(formatMoney(12345.67)).toEqual('$12,345.67');
  });

  it('should work for negative numbers', () => {
    expect(formatMoney(-123)).toEqual('$-123.00');
    expect(formatMoney(-123.45)).toEqual('$-123.45');
    expect(formatMoney(-12345.67)).toEqual('$-12,345.67');
  });

  it('should allow precision to be `0` and not override with default `2`', () => {
    expect(formatMoney(5318008, { symbol: '$', precision: 0 })).toEqual('$5,318,008');
  });
});
