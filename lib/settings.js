/**
 * The library's settings configuration interface.
 *
 * @typedef {Object} Settings
 * @property {String} [symbol='$'] - Currency symbol
 * @property {String|Object} [format='%s%v'] - Controls output: %s = symbol, %v = value (can be object, see docs)
 * @property {String} [decimal='.'] - Decimal point separator
 * @property {String} [thousand=',] - Thousands separator
 * @property {Number} [precision=2] - Decimal places
 * @property {Number} [grouping=3] - Digit grouping (not implemented yet)
 * @property {Boolean} [stripZeros=false] - Strip insignificant zeros from decimal part
 * @property {Float} [fallback=0] - Value returned on unformat() failure
 */

/**
 * The library's default settings configuration object.
 * Contains default parameters for currency and number formatting.
 *
 * @type {Settings} settings
 */
const settings = {
  symbol: '$',
  format: '%s%v',
  decimal: '.',
  thousand: ',',
  precision: 2,
  grouping: 3,
  stripZeros: false,
  fallback: 0
};

export default settings;
