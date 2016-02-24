import isString from 'is-string';

/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 *
 * @method _checkCurrencyFormat
 * @for accounting
 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
 * @return {Object} object represnting format (with pos, neg and zero attributes)
 */
function _checkCurrencyFormat(format) {
  // Format should be a string, in which case `value` ('%v') must be present:
  if (isString(format) && format.match('%v')) {
    // Create and return positive, negative and zero formats:
    return {
      pos: format,
      neg: format.replace('-', '').replace('%v', '-%v'),
      zero: format
    };
  }

  // Otherwise, assume format was fine:
  return format;
}

export default _checkCurrencyFormat;
