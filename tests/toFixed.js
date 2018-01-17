import test from 'ava';
import { toFixed } from '..';

test('performs basic float zero-padding', t => {
  t.is(toFixed(54321, 5), '54321.00000');
});

test('should round', t => {
  t.is(toFixed(0.615, 2), '0.62');
  t.is(toFixed(74.725, 2), '74.73');
  t.is(toFixed(158.605, 2), '158.61');
  t.is(toFixed(3.1415, 2, 1), '3.15');
  t.is(toFixed(12.56, 1, -1), '12.5');
});

test('should handle precision up to 10 decimals', t => {
  t.is(toFixed(0.0045471301, 10), '0.0045471301');
});
