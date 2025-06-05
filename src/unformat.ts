import { NestedArray } from './types';
import { settings } from './settings';

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value.
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * `settings.decimal`), so if the number uses a non-standard decimal
 * separator, provide it as the second argument.
 *
 * Also matches bracketed negatives (eg. `'$ (1.99)' => -1.99`).
 *
 * Doesn't throw any errors (`NaN`s become 0 or provided by fallback value).
 *
 * **Usage:**
 *
 * ```js
 * unformat('£ 12,345,678.90 GBP');
 * // => 12345678.9
 * ```
 *
 * @param {String} value - String containing the number to parse
 * @param {String} [decimal=settings.decimal] - The character used to represent the decimal separator
 * @param {Float} [fallback=settings.fallback] - Value returned on unformat() failure
 * @returns {Float} - Parsed number
 */

export function unformat(value: string, decimal: string = settings.decimal!, fallback: number = settings.fallback!): number {
  // Return the value as-is if it's already a number
  // if (typeof value === 'number') return value;

  // Build regex to strip out everything except digits, decimal point and minus sign
  const regex = new RegExp(`[^0-9-(-)-${decimal}]`, 'g');
  const unformattedValueString =
      ('' + value)
        .replace(regex, '')         // strip out any cruft
        .replace(decimal, '.')      // make sure decimal point is standard
        .replace(/\(([-]*\d*[^)]?\d+)\)/g, '-$1') // replace bracketed values with negatives
        .replace(/\((.*)\)/, '');   // remove any brackets that do not have numeric value

  /**
   * Handling -ve number and bracket, eg.
   * (-100) = 100, -(100) = 100, --100 = 100
   */
  const negative = (unformattedValueString.match(/-/g) || '').length % 2;
  const absUnformatted = parseFloat(unformattedValueString.replace(/-/g, ''));
  const unformatted = absUnformatted * ((negative) ? -1 : 1);

  // This will fail silently which may cause trouble, let's wait and see
  return !isNaN(unformatted) ? unformatted : fallback;
}

export function unformatArray(value: NestedArray<string>, decimal: string = settings.decimal!, fallback: number = settings.fallback!): NestedArray<number> {
  // Recursively unformat arrays:
  if (Array.isArray(value)) {
    return value.map((val) => unformatArray(val, decimal, fallback));
  }

  return unformat(value, decimal, fallback);
}
