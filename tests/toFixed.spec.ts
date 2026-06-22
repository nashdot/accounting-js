import { describe, expect, it } from 'vitest';
import { toFixed } from '..';

describe('toDate()', () => {
  it('performs basic float zero-padding', () => {
    expect(toFixed(54321, 5)).toEqual('54321.00000');
  });

  it('should round', () => {
    expect(toFixed(0.615, 2)).toEqual('0.62');
    expect(toFixed(74.725, 2)).toEqual('74.73');
    expect(toFixed(158.605, 2)).toEqual('158.61');
    expect(toFixed(3.1415, 2, 1)).toEqual('3.15');
    expect(toFixed(12.56, 1, -1)).toEqual('12.5');
  });

  it('should not nudge ceil/floor of a value already at the target precision', () => {
    expect(toFixed(1, 0, 1)).toEqual('1');
    expect(toFixed(100, 0, 1)).toEqual('100');
    expect(toFixed(5, 2, 1)).toEqual('5.00');
    expect(toFixed(0.25, 2, 1)).toEqual('0.25');
    expect(toFixed(0.99999999, 2, -1)).toEqual('0.99');
  });
});
