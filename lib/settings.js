/**
 * The library's settings configuration interface.
 *
 * @typedef {Object} Settings
 * @property {String} [symbol='$'] - Currency symbol
 * @property {String|CurrencyFormat} [format='%s%v'] - Controls output: %s = symbol, %v = value (can be object, see docs)
 * @property {String} [decimal='.'] - Decimal point separator
 * @property {String} [thousand=','] - Thousands separator
 * @property {Number} [precision=2] - Number of decimal places to round the amount to
 * @property {Number} [grouping=3] - Digit grouping (not implemented yet)
 * @property {Boolean} [stripZeros=false] - Strip insignificant zeros from decimal part
 * @property {Float} [fallback=0] - Value returned on unformat() failure
 */

/**
 * Currency format interface.
 *
 * Each property represents template string used by formatMoney.
 * Inside this template you can use these patterns:
 * - **%s** - Currency symbol
 * - **%v** - Amount
 *
 * **Examples**:
 * ```js
 * '%s %v'   => '$ 1.00'
 * '%s (%v)' => '$ (1.00)'
 * '%s  -- ' => '$  --'
 * ```
 *
 * @typedef {Format} CurrencyFormat
 * @property {String} pos - Currency format for positive values
 * @property {String} [neg=pos] - Currency format for positive values
 * @property {String} [zero=pos] - Currency format for positive values
 *
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
