import { settings } from './settings';

/**
 * Implementation of toFixed() that treats floats more like decimals.
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 *
 * **Usage:**
 *
 * ```js
 * // Native toFixed has rounding issues
 * (0.615).toFixed(2);
 * // => '0.61'
 *
 * // With accounting-js
 * toFixed(0.615, 2);
 * // => '0.62'
 * ```
 *
 * @param {Float} value - Float to be treated as a decimal number
 * @param {Number} [precision=settings.precision] - Number of decimal digits to keep
 * @param {Number} [round=settings.round] - Decide round direction
 * @returns {String} - Given number transformed into a string with the given precission
 */
export function toFixed(value: number, precision?: number, round?: number): string {
  precision ??= settings.precision!;
  round ??= settings.round!;
  const power = Math.pow(10, precision);

  let roundMethod;
  if (round > 0) {
    roundMethod = Math.ceil;
  } else if (round < 0) {
    roundMethod = Math.floor;
  } else {
    roundMethod = Math.round;
  }
  // Multiply up by precision, round accurately, then divide and use native toFixed()
  return (roundMethod((value + 1e-8) * power) / power).toFixed(precision);
}
