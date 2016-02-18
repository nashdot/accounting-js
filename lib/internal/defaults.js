/**
 * Extends an object with a defaults object, similar to underscore's _.defaults
 *
 * Used for abstracting parameter handling from API methods
 */
export default function defaults(object, defs) {
  let key;
  object = object || {};
  defs = defs || {};

  // Iterate over object non-prototype properties:
  for (key in defs) {
    if (defs.hasOwnProperty(key)) {
      // Replace values with defaults only if undefined (allow empty/zero values):
      if (object[key] === undefined || object[key] === null) object[key] = defs[key];
    }
  }

  return object;
}
