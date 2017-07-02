import test from 'ava';
import { toFixed } from '..';

test('performs basic float zero-padding', t => {
  t.is(toFixed(54321, 5), '54321.00000');
});

test('should round', t => {
  t.is(accounting.toFixed(0.615, 2), '0.62');
  t.is(accounting.toFixed(74.725, 2), '74.73');
  t.is(accounting.toFixed(158.605, 2), '158.61');
  t.is(accounting.toFixed(3.1415, 2, 1), '3.15');
  t.is(accounting.toFixed(12.56, 1, -1), '12.5');
});
