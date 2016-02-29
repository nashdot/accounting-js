import test from 'ava';
import accounting from '..';

test('settings can be changed', t => {
  accounting.settings.symbol = '¥ ';
  t.is(accounting.formatMoney(123), '¥ 123.00');

  Object.assign(accounting.settings, {
    symbol: '€',
    format: '%s %v',
    decimal: ',',
    thousand: '.'
  });
  t.is(accounting.formatMoney(1234567), '€ 1.234.567,00');
});
