/**
 * The library's settings configuration object.
 *
 * Contains default parameters for currency and number formatting.
 *
 * @type Object
 */
const settings = {
  /**
   * Currency symbol
   *
   * @type {String}
   */
  symbol: '$',
  /**
   * Controls output: %s = symbol, %v = value (can be object, see docs)
   *
   * @type {String|Object}
   */
  format: '%s%v',
  /**
   * Decimal point separator
   *
   * @type {String}
   */
  decimal: '.',
  /**
   * Thousands separator
   *
   * @type {String}
   */
  thousand: ',',
  /**
   * Decimal places
   *
   * @type {Number}
   */
  precision: 2,
  /**
   * Digit grouping (not implemented yet)
   *
   * @type {Number}
   */
  grouping: 3,
  /**
   * Strip insignificant zeros from decimal part
   *
   * @type {Boolean}
   */
  stripZeros: false,
  /**
   * Value returned on unformat() failure
   *
   * @type {Float}
   */
  fallback: 0
};

export default settings;
