export type NestedArray<T> = T | NestedArray<T>[];

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
 * @property {String} [neg=pos] - Currency format for negative values
 * @property {String} [zero=pos] - Currency format for zero values
 *
 */
export type CurrencyFormat = {
  pos: string; // Currency format for positive values
  neg?: string; // Currency format for negative values
  zero?: string; // Currency format for zero values
};

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
 * @property {Number} [round=0] - Decide round direction.
 */
export type Settings = {
  symbol?: string; // Currency symbol
  format?: string | CurrencyFormat; // Controls output: %s = symbol, %v = value (can be object, see docs)
  decimal?: string; // Decimal point separator
  thousand?: string; // Thousands separator
  precision?: number; // Number of decimal places to round the amount to
  grouping?: number; // Digit grouping (not implemented yet)
  stripZeros?: boolean; // Strip insignificant zeros from decimal part
  fallback?: number; // Value returned on unformat() failure
  round?: number; // Decide round direction.
};
