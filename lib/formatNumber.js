import isObject from './internal/isObject';
import isArray from './internal/isArray';
import defaults from './internal/defaults';
import map from './internal/map';

import _stripInsignificantZeros from './_stripInsignificantZeros';
import settings from './settings';
import unformat from './unformat';
import toFixed from './toFixed';

/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings`
 *
 * ```js
 * accounting.formatNumber(5318008);              // 5,318,008
 * accounting.formatNumber(9876543.21, 3, " "); // 9 876 543.210
 * ```
 *
 * @method formatNumber
 * @for accounting
 * @param {Number}        number The number to be formatted.
 * @param {Integer}       [precision=2] Number of decimal digits
 * @param {String}        [thousand=','] String with the thousands separator.
 * @param {String}        [decimal="."] String with the decimal separator.
 * @param {Boolean}       [stripZeros=false] Indicates if should strip insignificant zeros.
 * @return {String} The given number properly formatted.
  */
function formatNumber(number, precision, thousand, decimal, stripZeros) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, (val) => formatNumber(val, precision, thousand, decimal, stripZeros));
  }

  // Clean up number:
  number = unformat(number, decimal);

  // Build options object from second param (if object) or all params, extending defaults:
  const opts = defaults(
    (isObject(precision) ? precision : {
      'precision': precision,
      'thousand': thousand,
      'decimal': decimal,
      'stripZeros': stripZeros
    }),
    settings
  );

  // Do some calc:
  const negative = number < 0 ? '-' : '';
  const base = parseInt(toFixed(Math.abs(number), opts.precision), 10) + '';
  const mod = base.length > 3 ? base.length % 3 : 0;

  // Format the number:
  const formatted = negative +
    (mod ? base.substr(0, mod) + opts.thousand : '') +
      base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) +
        (opts.precision > 0 ? opts.decimal + toFixed(Math.abs(number), opts.precision).split('.')[1] : '');

  return opts.stripZeros ? _stripInsignificantZeros(formatted, opts.decimal) : formatted;
}

export default formatNumber;
