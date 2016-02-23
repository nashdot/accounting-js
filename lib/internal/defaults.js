import objectAssign from 'object-assign';

/**
 * Extends an object with a defaults object, similar to underscore's _.defaults
 *
 * Used for abstracting parameter handling from API methods
 */
export default function defaults(obj = {}, defs = {}) {
  return objectAssign({}, defs, obj);
}
