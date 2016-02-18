import test from 'ava';
import accounting from '..';

test('should work for small numbers', t => {
  t.is(accounting.formatMoney(123), '$123.00');
  t.is(accounting.formatMoney(123.45), '$123.45');
  t.is(accounting.formatMoney(12345.67), '$12,345.67');
});

test('should work for negative numbers', t => {
  t.is(accounting.formatMoney(-123), '$-123.00');
  t.is(accounting.formatMoney(-123.45), '$-123.45');
  t.is(accounting.formatMoney(-12345.67), '$-12,345.67');
});

test('should allow precision to be `0` and not override with default `2`', t => {
  t.is(accounting.formatMoney(5318008, { symbol: '$', precision: 0 }), '$5,318,008');
});
