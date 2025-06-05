import { describe, expect, it } from 'vitest';
import { settings, formatMoney  } from '../dist';

describe('formatColumn()', () => {
  it('settings can be changed', () => {
    settings.symbol = '¥ ';
    expect(formatMoney(123)).toEqual('¥ 123.00');

    Object.assign(settings, {
      symbol: '€',
      format: '%s %v',
      decimal: ',',
      thousand: '.',
    });
    expect(formatMoney(1234567)).toEqual('€ 1.234.567,00');
  });
});
