import test from 'ava';
import accounting from '../dist/accounting.umd.js';

test('should remove padding special chars', t => {
  t.is(accounting.unformat('$ 123,456'), 123456);
  t.is(accounting.unformat('$ 123,456.78'), 123456.78);
  t.is(accounting.unformat('&*()$ 123,456'), 123456);
  t.is(accounting.unformat(';$@#$%^&123,456.78'), 123456.78);
  t.is(accounting.unformat(';$@#$%^&123,456.78E-19'), 123456.78E-19);
});

test('should work with negative numbers', t => {
  t.is(accounting.unformat('$ -123,456'), -123456);
  t.is(accounting.unformat('$ -123,456.78'), -123456.78);
  t.is(accounting.unformat('&*()$ -123,456'), -123456);
  t.is(accounting.unformat(';$@#$%^&-123,456.78'), -123456.78);
  t.is(accounting.unformat(';$@#$%^&-123,456.78E-17'), -123456.78E-17);
});

test('should accept different decimal separators', t => {
  t.is(accounting.unformat('$ 123,456', ','), 123.456);
  t.is(accounting.unformat('$ 123456|78', '|'), 123456.78);
  t.is(accounting.unformat('&*()$ 123>456', '>'), 123.456);
  t.is(accounting.unformat(';$@#$%^&123,456\'78', '\''), 123456.78);
  t.is(accounting.unformat(';$@#$%^&123,456\'78E-17', '\''), 123456.78E-17);
});

test('should accept an array', t => {
  const vals = accounting.unformat(['$ 123', '$567.89', 'R$12,345,678.901', '3.21e-17']);
  t.is(vals[0], 123);
  t.is(vals[1], 567.89);
  t.is(vals[2], 12345678.901);
  t.is(vals[3], 3.21e-17);
});

test('should fallback with correct value', t => {
  t.is(accounting.unformat('string'), 0);
  t.is(accounting.unformat({ joss: 1 }), 0);
  t.is(accounting.unformat('string', ',', null), null);
  t.is(accounting.unformat('string', ',', 'failed'), 'failed');
});
