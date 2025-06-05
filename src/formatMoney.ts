import { NestedArray, Settings } from './types';
import { checkCurrencyFormat } from './internal/checkCurrencyFormat';
import { settings } from './settings';
import { formatNumber } from './formatNumber';

/**
 * Format a number into currency.
 *
 * **Usage:**
 *
 * ```js
 * // Default usage
 * formatMoney(12345678);
 * // => $12,345,678.00
 *
 * // European formatting (custom symbol and separators)
 * formatMoney(4999.99, { symbol: "€", precision: 2, thousand: ".", decimal: "," });
 * // => €4.999,99
 *
 * // Negative values can be formatted nicely
 * formatMoney(-500000, { symbol: "£ ", precision: 0 });
 * // => £ -500,000
 *
 * // Simple `format` string allows control of symbol position (%v = value, %s = symbol)
 * formatMoney(5318008, { symbol: "GBP",  format: "%v %s" });
 * // => 5,318,008.00 GBP
 * ```
 *
 * @access public
 * @param {Number} amount - Amount to be formatted
 * @param {Object} [opts={}] - Object containing all the options of the method
 * @return {String} - Given number properly formatted as money
 */
export function formatMoney(amount: number, opts: Settings = {}): string {
  // Build options object from second param (if object) or all params, extending defaults
  opts = Object.assign({},
    settings,
    opts
  );

  // Check format (returns object with pos, neg and zero)
  const formats = checkCurrencyFormat(opts.format!);

  // Choose which format to use for this value
  let useFormat;

  if (amount > 0) {
    useFormat = formats.pos;
  } else if (amount < 0) {
    useFormat = formats.neg!;
  } else {
    useFormat = formats.zero!;
  }

  // Return with currency symbol added
  return useFormat
    .replace('%s', opts.symbol!)
    .replace('%v', formatNumber(Math.abs(amount), opts));
}

export function formatMoneyArray(amount: NestedArray<number>, opts: Settings = {}): NestedArray<string> {
  // Resursively format arrays
  if (Array.isArray(amount)) {
    return amount.map((value) => formatMoneyArray(value, opts));
  }

  return formatMoney(amount, opts);
}
