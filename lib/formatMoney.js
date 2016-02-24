import objectAssign from 'object-assign';

import _checkCurrencyFormat from './internal/checkCurrencyFormat';
import settings from './settings';
import formatNumber from './formatNumber';

/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, '$', 2, ',', '.', '%s%v')
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 *
 * ```js
 * // Default usage:
 * accounting.formatMoney(12345678); // $12,345,678.00
 *
 * // European formatting (custom symbol and separators), can also use options object as second parameter:
 * accounting.formatMoney(4999.99, { symbol: "€", precision: 2, thousand: ".", decimal: "," }); // €4.999,99
 *
 * // Negative values can be formatted nicely:
 * accounting.formatMoney(-500000, { symbol: "£ ", precision: 0 }); // £ -500,000
 *
 * // Simple `format` string allows control of symbol position (%v = value, %s = symbol):
 * accounting.formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }); // 5,318,008.00 GBP
 * ```
 *
 * @method formatMoney
 * @for accounting
 * @param {Number}        number Number to be formatted.
 * @param {Object}        [opts={}] Object containing all the options of the method.
 * @return {String} The given number properly formatted as money.
 */
function formatMoney(number, opts = {}) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map((val) => formatMoney(val, opts));
  }

  // Build options object from second param (if object) or all params, extending defaults:
  opts = objectAssign({},
    settings,
    opts
  );

  // Check format (returns object with pos, neg and zero):
  const formats = _checkCurrencyFormat(opts.format);

  // Choose which format to use for this value:
  let useFormat;

  if (number > 0) {
    useFormat = formats.pos;
  } else if (number < 0) {
    useFormat = formats.neg;
  } else {
    useFormat = formats.zero;
  }

  // Return with currency symbol added:
  return useFormat
    .replace('%s', opts.symbol)
    .replace('%v', formatNumber(Math.abs(number), opts));
}

export default formatMoney;
