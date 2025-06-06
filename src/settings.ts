import { Settings } from './types';

/**
 * The library's default settings configuration object.
 * Contains default parameters for currency and number formatting.
 *
 * @type {Settings} settings
 */
export const settings: Settings = {
  symbol: '$',
  format: '%s%v',
  decimal: '.',
  thousand: ',',
  precision: 2,
  grouping: 3,
  stripZeros: false,
  fallback: 0,
  round: 0,
};
