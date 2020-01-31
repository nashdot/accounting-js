import test from 'ava';
import { settings, formatMoney } from '..';

test('settings can be changed', t => {
  settings.symbol = '¥ ';
  t.is(formatMoney(123), '¥ 123.00');

  Object.assign(settings, {
    symbol: '€',
    format: '%s %v',
    decimal: ',',
    thousand: '.',
  });
  t.is(formatMoney(1234567), '€ 1.234.567,00');
});
