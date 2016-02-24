import objectAssign from 'object-assign';
import isString from 'is-string';

import _checkCurrencyFormat from './internal/checkCurrencyFormat';
import settings from './settings';
import formatNumber from './formatNumber';
import unformat from './unformat';

/**
 * Format a list of numbers into an accounting column, padding with whitespace
 * to line up currency symbols, thousand separators and decimals places
 *
 * List should be an array of numbers
 *
 * Returns array of accouting-formatted number strings of same length
 *
 * NB: `white-space:pre` CSS rule is required on the list container to prevent
 * browsers from collapsing the whitespace in the output strings.
 *
 * ```js
 * accounting.formatColumn([123.5, 3456.49, 777888.99, 12345678, -5432], { symbol: "$ " });
 * ```
 *
 * @method formatColumn
 * @for accounting
 * @param {Array<Number>} list An array of numbers to format
 * @param {Object}        [opts={}] Object containing all the options of the method.
 * @param {Object|String} [symbol="$"] String with the currency symbol. For conveniency if can be an object containing all the options of the method.
 * @param {Integer}       [precision=2] Number of decimal digits
 * @param {String}        [thousand=','] String with the thousands separator.
 * @param {String}        [decimal="."] String with the decimal separator.
 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
 * @return {Array<String>} array of accouting-formatted number strings of same length
 */
function formatColumn(list, opts = {}) {
  if (!list) return [];

  // Build options object from second param (if object) or all params, extending defaults:
  opts = objectAssign({},
    settings,
    opts
  );

  // Check format (returns object with pos, neg and zero), only need pos for now:
  const formats = _checkCurrencyFormat(opts.format);

  // Whether to pad at start of string or after currency symbol:
  const padAfterSymbol = formats.pos.indexOf('%s') < formats.pos.indexOf('%v');

  // Store value for the length of the longest string in the column:
  let maxLength = 0;

  // Format the list according to options, store the length of the longest string:
  const formatted = list.map((val) => {
    if (Array.isArray(val)) {
      // Recursively format columns if list is a multi-dimensional array:
      return formatColumn(val, opts);
    }
    // Clean up the value
    val = unformat(val, opts.decimal);

    // Choose which format to use for this value (pos, neg or zero):
    let useFormat;

    if (val > 0) {
      useFormat = formats.pos;
    } else if (val < 0) {
      useFormat = formats.neg;
    } else {
      useFormat = formats.zero;
    }

    // Format this value, push into formatted list and save the length:
    const fVal = useFormat
      .replace('%s', opts.symbol)
      .replace('%v', formatNumber(Math.abs(val), opts));

    if (fVal.length > maxLength) {
      maxLength = fVal.length;
    }

    return fVal;
  });

  // Pad each number in the list and send back the column of numbers:
  return formatted.map((val) => {
    // Only if this is a string (not a nested array, which would have already been padded):
    if (isString(val) && val.length < maxLength) {
      // Depending on symbol position, pad after symbol or at index 0:
      return padAfterSymbol ?
        val.replace(opts.symbol, opts.symbol + (new Array(maxLength - val.length + 1).join(' '))) :
        (new Array(maxLength - val.length + 1).join(' ')) + val;
    }
    return val;
  });
}

export default formatColumn;
