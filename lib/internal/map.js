/**
 * Implementation of `Array.map()` for iteration loops
 *
 * Returns a new Array as a result of calling `iterator` on each array value.
 * Defers to native Array.map if available
 */
export default function map(obj, iterator, context) {
  const results = [];
  let i, j;

  if (!obj) return results;

  // Use native .map method if it exists:
  if (Array.prototype.map && obj.map === Array.prototype.map) return obj.map(iterator, context);

  // Fallback for native .map:
  for (i = 0, j = obj.length; i < j; i++) {
    results[i] = iterator.call(context, obj[i], i, obj);
  }
  return results;
}
