import test from 'ava';
import accounting from '..';

test('should remove padding special chars', t => {
  t.is(accounting.unformat('$ 123,456'), 123456);
  t.is(accounting.unformat('$ 123,456.78'), 123456.78);
  t.is(accounting.unformat('&*()$ 123,456'), 123456);
  t.is(accounting.unformat(';$@#$%^&123,456.78'), 123456.78);
});

test('should work with negative numbers', t => {
  t.is(accounting.unformat('$ -123,456'), -123456);
  t.is(accounting.unformat('$ -123,456.78'), -123456.78);
  t.is(accounting.unformat('&*()$ -123,456'), -123456);
  t.is(accounting.unformat(';$@#$%^&-123,456.78'), -123456.78);
});

test('should accept different decimal separators', t => {
  t.is(accounting.unformat('$ 123,456', ','), 123.456);
  t.is(accounting.unformat('$ 123456|78', '|'), 123456.78);
  t.is(accounting.unformat('&*()$ 123>456', '>'), 123.456);
  t.is(accounting.unformat(';$@#$%^&123,456\'78', '\''), 123456.78);
});

test('should handle negative numbers and brackets', t => {
  t.is(accounting.unformat('(123,456)'), -123456);
  t.is(accounting.unformat('(123)456'), -123456);
  t.is(accounting.unformat('(IND)123'), 123);
  t.is(accounting.unformat('IND(123)'), -123);
  t.is(accounting.unformat('-(123)'), 123);
  t.is(accounting.unformat('(-123)'), 123);
  t.is(accounting.unformat('(1,234.56)'), -1234.56);
});

test('should handle negative decimal numbers within brackets', t => {
  const decimal = accounting.settings.decimal;
  accounting.settings.decimal = '@';
  t.is(accounting.unformat('(1,234@56)'), -1234.56);
  t.is(accounting.unformat('(1,234.56)'), -123456);
  accounting.settings.decimal = decimal;
});

test('should accept an array', t => {
  const vals = accounting.unformat(['$ 123', '$567.89', 'R$12,345,678.901']);
  t.is(vals[0], 123);
  t.is(vals[1], 567.89);
  t.is(vals[2], 12345678.901);
});

test('should fallback with correct value', t => {
  t.is(accounting.unformat('string'), 0);
  t.is(accounting.unformat({ joss: 1 }), 0);
  t.is(accounting.unformat('string', ',', null), null);
  t.is(accounting.unformat('string', ',', 'failed'), 'failed');
});
