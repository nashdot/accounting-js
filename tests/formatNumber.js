import test from 'ava';
import accounting from '../dist/accounting.umd.js';

test('should enforce precision and round values', t => {
  t.is(accounting.formatNumber(123.456789, 0), '123');
  t.is(accounting.formatNumber(123.456789, 1), '123.5');
  t.is(accounting.formatNumber(123.456789, 2), '123.46');
  t.is(accounting.formatNumber(123.456789, 3), '123.457');
  t.is(accounting.formatNumber(123.456789, 4), '123.4568');
  t.is(accounting.formatNumber(123.456789, 5), '123.45679');
});

test('should fix floting point rounding error', t => {
  t.is(accounting.formatNumber(0.615, 2), '0.62');
  t.is(accounting.formatNumber(0.614, 2), '0.61');
});

test('should work for large numbers', t => {
  t.is(accounting.formatNumber(123456.54321, 0), '123,457');
  t.is(accounting.formatNumber(123456.54321, 1), '123,456.5');
  t.is(accounting.formatNumber(123456.54321, 2), '123,456.54');
  t.is(accounting.formatNumber(123456.54321, 3), '123,456.543');
  t.is(accounting.formatNumber(123456.54321, 4), '123,456.5432');
  t.is(accounting.formatNumber(123456.54321, 5), '123,456.54321');

  t.is(accounting.formatNumber(98765432.12, 0), '98,765,432');
  t.is(accounting.formatNumber(98765432.12, 1), '98,765,432.1');
  t.is(accounting.formatNumber(98765432.12, 2), '98,765,432.12');
  t.is(accounting.formatNumber(98765432.12, 3), '98,765,432.120');
  t.is(accounting.formatNumber(98765432.12, 4), '98,765,432.1200');
});

test('should work for negative number', t => {
  t.is(accounting.formatNumber(-123456.54321, 0), '-123,457');
  t.is(accounting.formatNumber(-123456.54321, 1), '-123,456.5');
  t.is(accounting.formatNumber(-123456.54321, 2), '-123,456.54');
  t.is(accounting.formatNumber(-123456.54321, 3), '-123,456.543');
  t.is(accounting.formatNumber(-123456.54321, 4), '-123,456.5432');
  t.is(accounting.formatNumber(-123456.54321, 5), '-123,456.54321');

  t.is(accounting.formatNumber(-98765432.12, 0), '-98,765,432');
  t.is(accounting.formatNumber(-98765432.12, 1), '-98,765,432.1');
  t.is(accounting.formatNumber(-98765432.12, 2), '-98,765,432.12');
  t.is(accounting.formatNumber(-98765432.12, 3), '-98,765,432.120');
  t.is(accounting.formatNumber(-98765432.12, 4), '-98,765,432.1200');
});

test('should allow setting thousands separator', t => {
  t.is(accounting.formatNumber(98765432.12, 0, '|'), '98|765|432');
  t.is(accounting.formatNumber(98765432.12, 1, '>'), '98>765>432.1');
  t.is(accounting.formatNumber(98765432.12, 2, '*'), '98*765*432.12');
  t.is(accounting.formatNumber(98765432.12, 3, '\''), '98\'765\'432.120');
  t.is(accounting.formatNumber(98765432.12, 4, ']'), '98]765]432.1200');
});

test('should allow setting decimal separator', t => {
  t.is(accounting.formatNumber(98765432.12, 0, null, '|'), '98,765,432');
  t.is(accounting.formatNumber(98765432.12, 1, null, '>'), '98,765,432>1');
  t.is(accounting.formatNumber(98765432.12, 2, null, '*'), '98,765,432*12');
  t.is(accounting.formatNumber(98765432.12, 3, null, '\''), '98,765,432\'120');
  t.is(accounting.formatNumber(98765432.12, 4, null, ']'), '98,765,432]1200');
});

test('should allow setting thousand and decimal separators', t => {
  t.is(accounting.formatNumber(98765432.12, 0, '\\', '|'), '98\\765\\432');
  t.is(accounting.formatNumber(98765432.12, 1, '<', '>'), '98<765<432>1');
  t.is(accounting.formatNumber(98765432.12, 2, '&', '*'), '98&765&432*12');
  t.is(accounting.formatNumber(98765432.12, 3, '"', '\''), '98"765"432\'120');
  t.is(accounting.formatNumber(98765432.12, 4, '[', ']'), '98[765[432]1200');
});

test('should use default separators if null', t => {
  t.is(accounting.formatNumber(12345.12345, 2, null, null), '12,345.12');
});

test('should use empty separators if passed as empty string', t => {
  t.is(accounting.formatNumber(12345.12345, 2, '', ''), '1234512');
});

test('should handle an array of numbers', t => {
  const vals = accounting.formatNumber([123, 456.78, 1234.123], 2);

  t.is(vals[0], '123.00');
  t.is(vals[1], '456.78');
  t.is(vals[2], '1,234.12');
});

test('should accept a properties object', t => {
  const val = accounting.formatNumber(123456789.1234, {
    'thousand': '.',
    'decimal': ',',
    'precision': 3
  });

  t.is(val, '123.456.789,123');
});

test('properties should be optional', t => {
  const val = accounting.formatNumber(123456789.1234, {});

  t.is(val, '123,456,789');
});
