export type NestedArray<T> = T | NestedArray<T>[];

export type CurrencyFormat = {
  pos: string; // Currency format for positive values
  neg?: string; // Currency format for negative values
  zero?: string; // Currency format for zero values
}

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
}
