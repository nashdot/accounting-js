import settings from './settings';

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
 * Alias: `accounting.parse(string)`
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * accounting.settings.decimal), so if the number uses a non-standard decimal
 * separator, provide it as the second argument.
 *
 * Also matches bracketed negatives (eg. '$ (1.99)' => -1.99)
 *
 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
 *
 * ```js
 *  accounting.unformat("£ 12,345,678.90 GBP"); // 12345678.9
 * ```
 *
 * @method unformat
 * @for accounting
 * @param {String|Array<String>} value The string or array of strings containing the number/s to parse.
 * @param {Number}               decimal Number of decimal digits of the resultant number
 * @return {Float} The parsed number
 */
function unformat(value, decimal = settings.decimal, fallback = settings.fallback) {
  // Recursively unformat arrays:
  if (Array.isArray(value)) {
    return value.map((val) => unformat(val, decimal, fallback));
  }

  // Return the value as-is if it's already a number:
  if (typeof value === 'number') return value;

   // Build regex to strip out everything except digits, decimal point and minus sign:
  const regex = new RegExp('[^0-9-(-)-' + decimal + ']', ['g']);
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
  const negative = (unformattedValueString.match(/-/g) || 2).length % 2,
    absUnformatted = parseFloat(unformattedValueString.replace(/-/g, '')),
    unformatted = absUnformatted * ((negative) ? -1 : 1);

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : fallback;
}

export default unformat;
