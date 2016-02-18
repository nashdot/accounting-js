import test from 'ava';
import accounting from '../dist/accounting.umd.js';

test('should work as expected', t => {
  const list = [123, 12345];
  t.is(accounting.formatColumn(list, { symbol: '$ ', precision: 0 }).toString(), (['$    123', '$ 12,345']).toString());
});

test('should work on multi-dimensional array', t => {
  const list = [[1, 100], [900, 9]];
  t.is(accounting.formatColumn(list).toString(), ([['$  1.00', '$100.00'], ['$900.00', '$  9.00']]).toString());
});

test('should return 3 strings of matching length', t => {
  const column = accounting.formatColumn([Math.random(), Math.random() * 1000, Math.random() * 10000000]);
  t.ok(column[0].length === column[2].length && column[1].length === column[2].length);
});

test('should return 3 strings of matching length with custom format', t => {
  const column = accounting.formatColumn([Math.random(), Math.random() * 1000, Math.random() * 10000000], {
    format: '(%v] --++== %s',
    thousand: ')(',
    decimal: ')[',
    precision: 3
  });
  t.ok(column[0].length === column[2].length && column[1].length === column[2].length);
});
