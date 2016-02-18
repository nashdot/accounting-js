/**
 * The library's settings configuration object.
 *
 * Contains default parameters for currency and number formatting
 */
const settings = {
  symbol: '$',        // default currency symbol is '$'
  format: '%s%v',     // controls output: %s = symbol, %v = value (can be object, see docs)
  decimal: '.',       // decimal point separator
  thousand: ',',      // thousands separator
  precision: 2,       // decimal places
  grouping: 3,        // digit grouping (not implemented yet)
  stripZeros: false,  // strip insignificant zeros from decimal part
  fallback: 0         // value returned on unformat() failure
};

export default settings;
