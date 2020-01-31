import test from 'ava';
import { formatNumber } from '..';

test('should enforce precision and round values', t => {
  t.is(formatNumber(123.456789, { precision: 0 }), '123');
  t.is(formatNumber(123.456789, { precision: 1 }), '123.5');
  t.is(formatNumber(123.456789, { precision: 2 }), '123.46');
  t.is(formatNumber(123.456789, { precision: 3 }), '123.457');
  t.is(formatNumber(123.456789, { precision: 4 }), '123.4568');
  t.is(formatNumber(123.456789, { precision: 5 }), '123.45679');
});

test('should fix floting point rounding error', t => {
  t.is(formatNumber(0.615, { precision: 2 }), '0.62');
  t.is(formatNumber(0.614, { precision: 2 }), '0.61');
});

test('should work for large numbers', t => {
  t.is(formatNumber(123456.54321, { precision: 0 }), '123,457');
  t.is(formatNumber(123456.54321, { precision: 1 }), '123,456.5');
  t.is(formatNumber(123456.54321, { precision: 2 }), '123,456.54');
  t.is(formatNumber(123456.54321, { precision: 3 }), '123,456.543');
  t.is(formatNumber(123456.54321, { precision: 4 }), '123,456.5432');
  t.is(formatNumber(123456.54321, { precision: 5 }), '123,456.54321');

  t.is(formatNumber(98765432.12, { precision: 0 }), '98,765,432');
  t.is(formatNumber(98765432.12, { precision: 1 }), '98,765,432.1');
  t.is(formatNumber(98765432.12, { precision: 2 }), '98,765,432.12');
  t.is(formatNumber(98765432.12, { precision: 3 }), '98,765,432.120');
  t.is(formatNumber(98765432.12, { precision: 4 }), '98,765,432.1200');
});

test('should work for negative number', t => {
  t.is(formatNumber(-123456.54321, { precision: 0 }), '-123,457');
  t.is(formatNumber(-123456.54321, { precision: 1 }), '-123,456.5');
  t.is(formatNumber(-123456.54321, { precision: 2 }), '-123,456.54');
  t.is(formatNumber(-123456.54321, { precision: 3 }), '-123,456.543');
  t.is(formatNumber(-123456.54321, { precision: 4 }), '-123,456.5432');
  t.is(formatNumber(-123456.54321, { precision: 5 }), '-123,456.54321');

  t.is(formatNumber(-98765432.12, { precision: 0 }), '-98,765,432');
  t.is(formatNumber(-98765432.12, { precision: 1 }), '-98,765,432.1');
  t.is(formatNumber(-98765432.12, { precision: 2 }), '-98,765,432.12');
  t.is(formatNumber(-98765432.12, { precision: 3 }), '-98,765,432.120');
  t.is(formatNumber(-98765432.12, { precision: 4 }), '-98,765,432.1200');
});

test('should allow setting thousand and decimal separators a flag indicating whether to strip insignificant zeros', t => {
  t.is(
    formatNumber(98765432.12, { precision: 3, stripZeros: true }),
    '98,765,432.12',
  );
  t.is(
    formatNumber(98765432.12, { precision: 3, stripZeros: false }),
    '98,765,432.120',
  );
  t.is(
    formatNumber(98765432.012, { precision: 2, stripZeros: true }),
    '98,765,432.01',
  );
  // t.is(formatNumber(098765432.0120, { precision: 2, stripZeros: true }), '98,765,432.01');
});

test('should allow setting thousands separator', t => {
  t.is(
    formatNumber(98765432.12, { precision: 0, thousand: '|' }),
    '98|765|432',
  );
  t.is(
    formatNumber(98765432.12, { precision: 1, thousand: '>' }),
    '98>765>432.1',
  );
  t.is(
    formatNumber(98765432.12, { precision: 2, thousand: '*' }),
    '98*765*432.12',
  );
  t.is(
    formatNumber(98765432.12, { precision: 3, thousand: "'" }),
    "98'765'432.120",
  );
  t.is(
    formatNumber(98765432.12, { precision: 4, thousand: ']' }),
    '98]765]432.1200',
  );
});

test('should allow setting decimal separator', t => {
  t.is(formatNumber(98765432.12, { precision: 0, decimal: '|' }), '98,765,432');
  t.is(
    formatNumber(98765432.12, { precision: 1, decimal: '>' }),
    '98,765,432>1',
  );
  t.is(
    formatNumber(98765432.12, { precision: 2, decimal: '*' }),
    '98,765,432*12',
  );
  t.is(
    formatNumber(98765432.12, { precision: 3, decimal: "'" }),
    "98,765,432'120",
  );
  t.is(
    formatNumber(98765432.12, { precision: 4, decimal: ']' }),
    '98,765,432]1200',
  );
});

test('should allow setting thousand and decimal separators', t => {
  t.is(
    formatNumber(98765432.12, { precision: 0, thousand: '\\', decimal: '|' }),
    '98\\765\\432',
  );
  t.is(
    formatNumber(98765432.12, { precision: 1, thousand: '<', decimal: '>' }),
    '98<765<432>1',
  );
  t.is(
    formatNumber(98765432.12, { precision: 2, thousand: '&', decimal: '*' }),
    '98&765&432*12',
  );
  t.is(
    formatNumber(98765432.12, { precision: 3, thousand: '"', decimal: "'" }),
    '98"765"432\'120',
  );
  t.is(
    formatNumber(98765432.12, { precision: 4, thousand: '[', decimal: ']' }),
    '98[765[432]1200',
  );
});

test('should round 74.725 to "74.73"', t => {
  t.is(formatNumber(74.725, { precision: 2 }), '74.73');
});

test('should use empty separators if passed as empty string', t => {
  t.is(
    formatNumber(12345.12345, { precision: 2, thousand: '', decimal: '' }),
    '1234512',
  );
});

test('should handle an array of numbers', t => {
  const vals = formatNumber([123, 456.78, 1234.123], { precision: 2 });

  t.is(vals[0], '123.00');
  t.is(vals[1], '456.78');
  t.is(vals[2], '1,234.12');
});

test('should accept a properties object', t => {
  const val = formatNumber(123456789.1234, {
    thousand: '.',
    decimal: ',',
    precision: 3,
  });

  t.is(val, '123.456.789,123');
});

test('properties should be optional', t => {
  const val = formatNumber(123456789.1234, {});

  t.is(val, '123,456,789.12');
});
