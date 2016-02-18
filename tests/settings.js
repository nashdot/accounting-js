import test from 'ava';
import accounting from '../dist/accounting.umd.js';

test('settings can be changed', t => {
  accounting.settings.symbol = '¥ ';
  t.is(accounting.formatMoney(123), '¥ 123.00');
});
