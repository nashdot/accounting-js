
import isObject from './internal/isObject';
import isString from './internal/isString';
import isArray from './internal/isArray';
import defaults from './internal/defaults';
import map from './internal/map';

// The library's settings configuration object. Contains default parameters for
// currency and number formatting
const settings = {
  'currency': {
    'symbol': '$',    // default currency symbol is '$'
    'format': '%s%v', // controls output: %s = symbol, %v = value (can be object, see docs)
    'decimal': '.',   // decimal point separator
    'thousand': ',',  // thousands separator
    'precision': 2,   // decimal places
    'grouping': 3     // digit grouping (not implemented yet)
  },
  'number': {
    'precision': 0,   // default precision on numbers is 0
    'grouping': 3,    // digit grouping (not implemented yet)
    'thousand': ',',
    'decimal': '.'
  }
};

/**
 * Check and normalise the value of precision (must be positive integer)
 */
function _checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val) ? base : val;
}

/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values (or a function returning
 * either a string or object)
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 */
function _checkCurrencyFormat(format) {
  const defaultFormat = settings.currency.format;

  // Allow function as format parameter (should return string or object):
  if (typeof format === 'function') {
    format = format();
  }

  // Format can be a string, in which case `value` ('%v') must be present:
  if (isString(format) && format.match('%v')) {
    // Create and return positive, negative and zero formats:
    return {
      'pos': format,
      'neg': format.replace('-', '').replace('%v', '-%v'),
      'zero': format
    };
  // If no format, or object is missing valid positive value, use defaults:
  } else if (!format || !format.pos || !format.pos.match('%v')) {
    // If defaults is a string, casts it to an object for faster checking next time:
    return (!isString(defaultFormat)) ? defaultFormat : settings.currency.format = {
      'pos': defaultFormat,
      'neg': defaultFormat.replace('%v', '-%v'),
      'zero': defaultFormat
    };
  }

  // Otherwise, assume format was fine:
  return format;
}

/* --- API Methods --- */

/**
 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
 * Alias: `accounting.parse(string)`
 *
 * Decimal must be included in the regular expression to match floats (defaults to
 * accounting.settings.number.decimal), so if the number uses a non-standard decimal
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
function unformat(value, decimal) {
  // Recursively unformat arrays:
  if (isArray(value)) {
    return map(value, (val) => unformat(val, decimal));
  }

  // Fails silently (need decent errors):
  value = value || 0;

  // Return the value as-is if it's already a number:
  if (typeof value === 'number') return value;

  // Default decimal point comes from settings, but could be set to eg. ',' in opts:
  decimal = decimal || settings.number.decimal;

   // Build regex to strip out everything except digits, decimal point and minus sign:
  const regex = new RegExp('[^0-9-' + decimal + 'Ee]', ['g']);
  const unformatted = parseFloat(
      ('' + value)
      .replace(/\((.+)\)/, '-$1') // replace bracketed values with negatives
      .replace(regex, '')         // strip out any cruft
      .replace(decimal, '.')      // make sure decimal point is standard
    );

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : 0;
}

/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 *
 * ```js
 *  (0.615).toFixed(2);           // "0.61" (native toFixed has rounding issues)
 *  accounting.toFixed(0.615, 2); // "0.62"
 * ```
 *
 * @method toFixed
 * @for accounting
 * @param Float}   value         The float to be treated as a decimal number.
 * @param {Number} [precision=2] The number of decimal digits to keep.
 * @return {String} The given number transformed into a string with the given precission
 */
function toFixed(value, precision) {
  precision = _checkPrecision(precision, settings.number.precision);
  const power = Math.pow(10, precision);

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  return (Math.round(unformat(value) * power) / power).toFixed(precision);
}

/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 * 2nd parameter `precision` can be an object matching `settings.number`
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
 * @return {String} The given number properly formatted.
  */
function formatNumber(number, precision, thousand, decimal) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, (val) => formatNumber(val, precision, thousand, decimal));
  }

  // Clean up number:
  number = unformat(number);

  // Build options object from second param (if object) or all params, extending defaults:
  const opts = defaults(
    (isObject(precision) ? precision : {
      'precision': precision,
      'thousand': thousand,
      'decimal': decimal
    }),
    settings.number
  );

  // Clean up precision
  const usePrecision = _checkPrecision(opts.precision);

  // Do some calc:
  const negative = number < 0 ? '-' : '';
  const base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + '';
  const mod = base.length > 3 ? base.length % 3 : 0;

  // Format the number:
  return negative +
    (mod ? base.substr(0, mod) + opts.thousand : '') +
      base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) +
        (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : '');
}

/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, '$', 2, ',', '.', '%s%v')
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 * Second param can be an object matching `settings.currency` which is the easiest way.
 *
 * To do: tidy up the parameters
 *
 * ```js
 * // Default usage:
 * accounting.formatMoney(12345678); // $12,345,678.00
 *
 * // European formatting (custom symbol and separators), can also use options object as second parameter:
 * accounting.formatMoney(4999.99, "€", 2, ".", ","); // €4.999,99
 *
 * // Negative values can be formatted nicely:
 * accounting.formatMoney(-500000, "£ ", 0); // £ -500,000
 *
 * // Simple `format` string allows control of symbol position (%v = value, %s = symbol):
 * accounting.formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }); // 5,318,008.00 GBP
 * ```
 *
 * @method formatMoney
 * @for accounting
 * @param {Number}        number Number to be formatted.
 * @param {Object|String} [symbol="$"] String with the currency symbol. For conveniency if can be an object containing all the options of the method.
 * @param {Integer}       [precision=2] Number of decimal digits
 * @param {String}        [thousand=','] String with the thousands separator.
 * @param {String}        [decimal="."] String with the decimal separator.
 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
 * @return {String} The given number properly formatted as money.
 */
function formatMoney(number, symbol, precision, thousand, decimal, format) {
  // Resursively format arrays:
  if (isArray(number)) {
    return map(number, (val) => formatMoney(val, symbol, precision, thousand, decimal, format));
  }

  // Clean up number:
  number = unformat(number);

  // Build options object from second param (if object) or all params, extending defaults:
  const opts = defaults(
    (isObject(symbol) ? symbol : {
      'symbol': symbol,
      'precision': precision,
      'thousand': thousand,
      'decimal': decimal,
      'format': format
    }),
    settings.currency
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
    .replace('%v', formatNumber(Math.abs(number), _checkPrecision(opts.precision), opts.thousand, opts.decimal));
}

/**
 * Format a list of numbers into an accounting column, padding with whitespace
 * to line up currency symbols, thousand separators and decimals places
 *
 * List should be an array of numbers
 * Second parameter can be an object containing keys that match the params
 *
 * Returns array of accouting-formatted number strings of same length
 *
 * NB: `white-space:pre` CSS rule is required on the list container to prevent
 * browsers from collapsing the whitespace in the output strings.
 *
 * ```js
 * accounting.formatColumn([123.5, 3456.49, 777888.99, 12345678, -5432], "$ ");
 * ```
 *
 * @method formatColumn
 * @for accounting
 * @param {Array<Number>} list An array of numbers to format
 * @param {Object|String} [symbol="$"] String with the currency symbol. For conveniency if can be an object containing all the options of the method.
 * @param {Integer}       [precision=2] Number of decimal digits
 * @param {String}        [thousand=','] String with the thousands separator.
 * @param {String}        [decimal="."] String with the decimal separator.
 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
 * @return {Array<String>} array of accouting-formatted number strings of same length
  */
function formatColumn(list, symbol, precision, thousand, decimal, format) {
  if (!list) return [];

  // Build options object from second param (if object) or all params, extending defaults:
  const opts = defaults(
    (isObject(symbol) ? symbol : {
      'symbol': symbol,
      'precision': precision,
      'thousand': thousand,
      'decimal': decimal,
      'format': format
    }),
    settings.currency
  );

  // Check format (returns object with pos, neg and zero), only need pos for now:
  const formats = _checkCurrencyFormat(opts.format);

  // Whether to pad at start of string or after currency symbol:
  const padAfterSymbol = formats.pos.indexOf('%s') < formats.pos.indexOf('%v');

  // Store value for the length of the longest string in the column:
  let maxLength = 0;

  // Format the list according to options, store the length of the longest string:
  const formatted = map(list, (val) => {
    if (isArray(val)) {
      // Recursively format columns if list is a multi-dimensional array:
      return formatColumn(val, opts);
    }
    // Clean up the value
    val = unformat(val);

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
      .replace('%v', formatNumber(Math.abs(val), _checkPrecision(opts.precision), opts.thousand, opts.decimal));

    if (fVal.length > maxLength) {
      maxLength = fVal.length;
    }

    return fVal;
  });

  // Pad each number in the list and send back the column of numbers:
  return map(formatted, (val) => {
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

export { settings, unformat, toFixed, formatMoney, formatNumber, formatColumn };

// Aliases
export {
  unformat as parse,
  formatNumber as format
};
